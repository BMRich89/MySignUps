type LinkButtonProps = {
    link: string,
    children: React.ReactNode
}


export default function LinkButton({ link, children }: LinkButtonProps) {
    return <div className="w-full">
    <a href={link} className="flex flex-col w-full h-50 bg-green-700/50 items-center justify-center">
            {children}
    </a>
    </div> 
}