import banknames from '../data/banknames.json';

export default function handler(req, res) {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Missing query param: q' });

  const results = Object.entries(banknames)
    .filter(([_, name]) => name.toLowerCase().includes(q.toLowerCase()))
    .map(([code, name]) => ({ code, name }));

  return res.status(200).json(results);
}