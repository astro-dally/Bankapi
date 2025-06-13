import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { bank, branch } = req.query;
  if (!bank || !branch) return res.status(400).json({ error: 'Missing bank or branch param' });

  const filePath = path.join(process.cwd(), 'data', 'banks', `${bank}.json`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: `No branch info found for bank code: ${bank}` });
  }

  let allBranches;
  try {
    allBranches = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (err) {
    return res.status(500).json({ error: 'Invalid branch JSON format' });
  }

  const matches = allBranches.filter(b =>
    typeof b.BRANCH === 'string' &&
    b.BRANCH.toLowerCase().includes(branch.toLowerCase())
  );

  return res.status(200).json(matches);
}
