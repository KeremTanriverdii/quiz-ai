"use client"
import { Editor, OnChange, OnMount, useMonaco } from '@monaco-editor/react'
import React, { useEffect, useRef } from 'react'
import { Question } from './data/type'

export default function MonacoEditor({ currentQuestion, handleChange }: {
    currentQuestion: Question,
    handleChange: (id: number | string, value: string) => void,
}) {
    const editorRef = useRef<any>(null);
    const monaco = useMonaco();

    useEffect(() => {
        if (monaco) {
            monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
                target: monaco.languages.typescript.ScriptTarget.ESNext,
                module: monaco.languages.typescript.ModuleKind.ESNext,
                jsx: monaco.languages.typescript.JsxEmit.React,
                lib: ["esnext", "dom", "dom.iterable", "es2015.core", "es2015.collection", "es2015.iterable"],
                allowJs: true,
                checkJs: true
            })
        }
    }, [monaco])
    const { id, tech, template } = currentQuestion;

    const handleEditorMount = (editor: any) => {
        editorRef.current = editor;
    };

    const handleEditorChange: OnChange = (value) => {
        handleChange(id, value || "");
    };
    console.log(tech)
    return (
        <div className='w-full h-full'>
            <Editor
                defaultLanguage={tech || 'javascript'}
                options={{
                    minimap: { enabled: false },
                    readOnly: false,
                    wordWrap: 'on'
                }}
                defaultValue={template}
                theme="vs-dark"
                onChange={handleEditorChange}
                onMount={handleEditorMount}
            />
        </div>
    )
}

// id="answers"
// placeholder="Type your answers here."
// onChange={(e) => handleChange(currentQuestion.id, e.target.value)}
// onKeyDown={(e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//         e.preventDefault();

//         handleSendMessage();
//     }
// }}
// className="flex-initial resize-none p-2 rounded-xl border border-[#ccc] min-[40px]:"
// style={{ height: '200px' }}