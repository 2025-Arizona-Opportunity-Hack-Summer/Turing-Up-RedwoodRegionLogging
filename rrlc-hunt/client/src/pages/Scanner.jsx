import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';
import ProgressBar from '../components/ProgressBar';

const TOTAL_CODES = 5;          // keep in sync with backend

export default function Scanner() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const codeParam = params.get('code');      // from ?code=owl
  const token = localStorage.getItem('classToken');
  const [progress, setProgress] = useState(() =>
    JSON.parse(localStorage.getItem('progress') || '[]')
  );

  // auto‑POST when page opened via QR
  useEffect(()=>{
    if (!codeParam || !token) return;
    if (progress.includes(codeParam)) return;        // already scanned

    fetch('/api/scans', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ token, codeId: codeParam })
    }).then(r=>r.json()).then(res=>{
      if (res.ok) {
        const next = [...new Set([...progress, codeParam])];
        setProgress(next);
        localStorage.setItem('progress', JSON.stringify(next));
        if (res.completed) navigate('/complete');
      }
    });
  }, [codeParam, token]);

  // fallback camera scan (if user navigates manually)
  const handleCamera = (data) => {
    if (data?.text) window.location.href = data.text;
  };

  if (!token) return <p className="p-4">Register first.</p>;

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl">Scan the wildlife QR codes</h2>
      <ProgressBar count={progress.length} total={TOTAL_CODES} />
      <p>{progress.length}/{TOTAL_CODES} found</p>
      <QrReader
        constraints={{ facingMode:'environment' }}
        onResult={(r)=>r && handleCamera(r)}
        containerStyle={{ width:'100%' }}
      />
    </div>
  );
}
