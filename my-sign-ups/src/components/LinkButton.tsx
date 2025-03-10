
'use client'

import { Paper } from "@mui/material"

type LinkButtonProps = {
    link: string,
    children: React.ReactNode
}


export default function LinkButton({ link, children }: LinkButtonProps) {
    return <Paper variant="outlined" className="w-full">
    <a href={link} className="flex flex-col w-50 h-50 bg-green-700/50 items-center justify-center">
            {children}
    </a>
    </Paper> 
}