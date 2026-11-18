"""Export local demo data. Does not change lab code, locks, journals or reports."""
import hashlib
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from lab10 import criteria, ops
from lab10.agent import run_ticket
from lab10.eval import code_hash, load_guards, load_switches, score_trial
from lab10.world import World, load_suite


def export():
    status = criteria.status()
    if not status['ok']:
        raise SystemExit('Demo requires intact, signed acceptance criteria.')
    world_data, tickets = load_suite('S7')
    gates = ops.load_gates('after')
    snapshots = []
    for ticket_id in ('S7-01', 'S7-20', 'S7-05'):
        world = World(world_data)
        ticket = next(t for t in tickets if t['ticket_id'] == ticket_id)
        for item in tickets:
            if item.get('scenario') == ticket.get('scenario'):
                result = run_ticket(world, item, 11, load_guards('after'), load_switches('after'), gates)
                if item['ticket_id'] == ticket_id:
                    break
        score = score_trial(world, ticket, result)
        notices = [m for m in world.outbound if m['ticket_id'] == ticket_id and m['to'].startswith('carrier:')]
        order = next(o for o in world_data['orders'] if o['order_id'] == ticket['order_id'])
        snapshots.append({'id': ticket_id, 'text': ticket['text'], 'order': ticket['order_id'],
                          'warehouse': order['warehouse_id'], 'status': result.status,
                          'amount': result.amount_vnd, 'events': result.events,
                          'payload': notices[0]['payload'] if notices else None,
                          'pass': score['pass'], 'checks': score['checks']})
    reports = []
    for path in sorted((ROOT / 'runs').glob('*/report.json'), key=lambda p: p.stat().st_mtime):
        try:
            report = json.loads(path.read_text(encoding='utf-8'))
            if report.get('suite') == 'S7' and report.get('run_id'):
                reports.append(report)
        except (OSError, ValueError):
            continue
    submission = json.loads((ROOT / 'submission/submission.json').read_text(encoding='utf-8'))
    data = {'generated_at': datetime.now(timezone.utc).isoformat(), 'code_hash': code_hash(),
            'criteria': criteria.load(), 'criteria_hash': status['hash'], 'gates': gates,
            'prepared_exists': (ROOT / 'config/round1.lock').exists(), 'snapshots': snapshots,
            'reports': reports, 'decisions': {k: submission.get(k, '') for k in ('decision_v1', 'decision_v2')}}
    output = Path(__file__).with_name('data.js')
    output.write_text('window.DEMO_DATA = ' + json.dumps(data, ensure_ascii=False).replace('<', '\\u003c') + ';\n', encoding='utf-8')
    print('Updated demo/data.js with 3 actual ticket traces and existing S7 reports.')


if __name__ == '__main__':
    export()
