import { useState } from 'react';

export default function Registration() {
  const [form, setForm] = useState({ teacher:'', school:'', size:'' });
  const [token, setToken] = useState(localStorage.getItem('classToken'));

  const submit = async e => {
    e.preventDefault();
    const res = await fetch('/api/classes/register', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({...form, size:+form.size})
    }).then(r=>r.json());

    localStorage.setItem('classToken', res.token);
    setToken(res.token);
  };

  if (token) {
    return (
      <div className="p-4 space-y-4 text-center">
        <h2 className="text-xl">Class registered!</h2>
        <p className="font-mono text-2xl">{token}</p>
        <a href="/scan" className="underline text-blue-600">Start scanning →</a>
        <button
          onClick={()=>{ localStorage.removeItem('classToken'); setToken(null); }}
          className="block mt-4 text-sm underline"
        >Register a different class</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="p-4 space-y-2 max-w-xs mx-auto">
      <input required placeholder="Teacher"
             className="border p-2 w-full"
             onChange={e=>setForm(f=>({...f,teacher:e.target.value}))} />
      <input placeholder="School"
             className="border p-2 w-full"
             onChange={e=>setForm(f=>({...f,school:e.target.value}))} />
      <input type="number" placeholder="Class size"
             className="border p-2 w-full"
             onChange={e=>setForm(f=>({...f,size:e.target.value}))} />
      <button className="bg-green-600 text-white px-4 py-2 w-full">Register</button>
    </form>
  );
}
