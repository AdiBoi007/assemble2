import React from "react"

export default function ChatLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-screen flex bg-black text-white overflow-hidden font-sans">
            {children}
        </div>
    )
}
