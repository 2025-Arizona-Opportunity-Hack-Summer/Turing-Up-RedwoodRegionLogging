export default function ProgressBar({ count, total }) {
  const pct = Math.min(100, (count/total)*100);
  return (
    <div className="w-full h-4 bg-gray-200 rounded">
      <div style={{width:pct+'%'}} className="h-full bg-green-500 rounded"></div>
    </div>
  );
}
