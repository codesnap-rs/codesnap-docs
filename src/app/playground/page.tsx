"use client"

import { useEffect, useState } from "react";
import init, { take_snapshot } from "codesnap.wasm";

export default function Playground() {
    const [loaded, setLoaded] = useState(false)
    const [code, setCode] = useState('print "Hello, World!"')
    const [lang, setLang] = useState('python')
    const [imgUrl, setImgUrl] = useState('')

    // TODO: Fetch supported languages from the wasm module, need to consider "before init" behavior
    const supportedLanguages = [
        {code: 'python', name: 'Python'},
        {code: 'rust', name: 'Rust'},
        {code: 'javascript', name: 'JavaScript'},
        {code: 'typescript', name: 'TypeScript'},
        {code: 'java', name: 'Java'},
        {code: 'c', name: 'C'},
        {code: 'cpp', name: 'C++'},
        {code: 'csharp', name: 'C#'},
        {code: 'go', name: 'Go'},
        {code: 'ruby', name: 'Ruby'},
        {code: 'php', name: 'PHP'},
    ];

    init().then(() => { setLoaded(true) })
    useEffect(() => {
        if (!loaded) {
            return;
        }

        const generateImageUrlTimeout = setTimeout(() => {
            const snapshot = take_snapshot(code, lang)
             // TODO: This freezes the UI for a few seconds, defer to a worker ?
            const imageSnapshot = snapshot.create_image_snapshot();
            const { data } = imageSnapshot.png_data();
            const blob = new Blob([data], { type: "image/png" });
            setImgUrl(URL.createObjectURL(blob));
        }, 500)

        return () => clearTimeout(generateImageUrlTimeout)
    }, [code, lang, loaded])

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">Playground</h1>
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Panel: Code Input */}
                <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg shadow p-6">
                    <div className="flex items-center mb-2">
                        <label className="block font-semibold mr-3 dark:text-gray-200">Language</label>
                        <select
                            value={lang}
                            onChange={(e) => setLang(e.target.value)}
                            className="p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            {supportedLanguages.map((language) => (
                                <option key={language.code} value={language.code}>
                                    {language.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <textarea
                        className="w-full min-h-[300px] font-mono text-base rounded border border-gray-300 dark:border-gray-700 p-3 bg-white dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        onChange={(e) => setCode(e.target.value)}
                        value={code}
                    />
                </div>
                {/* Right Panel: Image Output */}
                <div className="flex-1 bg-white dark:bg-gray-900 rounded-lg shadow p-6 flex flex-col items-center justify-center min-h-[350px]">
                    <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">Preview</h2>
                    {imgUrl ? (
                        <img
                            src={imgUrl}
                            alt="Code snapshot"
                            className="max-w-full max-h-[400px] rounded border border-gray-200 dark:border-gray-700 shadow"
                        />
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">Rendering…</p>
                    )}
                </div>
            </div>
        </div>
    )
}
