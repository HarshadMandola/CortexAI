import { Check, Copy, FileCode2, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearArtifact } from "../redux/artifactSlice";

function Artifact() {
  const {current:artifact}=useSelector((state)=>state.artifact)
  const dispatch=useDispatch()
  const [copied,setCopied]=useState(false)

  const copyCode=async()=>{
    await navigator.clipboard.writeText(artifact.code)
    setCopied(true)
    window.setTimeout(()=>setCopied(false),1500)
  }

  return (
    <aside className="hidden h-full w-[420px] shrink-0 flex-col border-l border-gray-800 bg-[#171717] lg:flex">
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-800 px-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-100"><FileCode2 size={18} className="text-blue-400" />Artifact</div>
        {artifact && <button onClick={()=>dispatch(clearArtifact())} className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-800 hover:text-white" aria-label="Close artifact"><X size={18}/></button>}
      </header>

      {artifact ? (
        <div className="flex min-h-0 flex-1 flex-col p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="min-w-0"><h2 className="truncate font-medium text-white">{artifact.title || "Code artifact"}</h2><p className="mt-1 text-xs uppercase tracking-wide text-blue-300">{artifact.language || "code"}</p></div>
            <button onClick={copyCode} className="flex shrink-0 items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200 transition hover:bg-gray-700">{copied ? <Check size={16} className="text-green-400"/> : <Copy size={16}/>} {copied ? "Copied" : "Copy"}</button>
          </div>
          <pre className="min-h-0 flex-1 overflow-auto rounded-xl border border-gray-800 bg-[#0d0d0d] p-4 text-sm leading-6 text-gray-200"><code>{artifact.code}</code></pre>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center text-gray-500"><FileCode2 size={36} className="mb-4 text-gray-700" /><p className="font-medium text-gray-400">No code artifact yet</p><p className="mt-2 text-sm">Ask CortexAI to write, explain, or fix code and the result will appear here.</p></div>
      )}
    </aside>
  )
}

export default Artifact
