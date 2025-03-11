import { Container, Typography } from "@mui/material";

type PageWrapperProps = { 
    title: string;
    children: React.ReactNode;
}


export default function PageWrapper({ title,children }: PageWrapperProps) {
  return (
    <Container sx={{bgcolor:"background.default"}} className="grid grid-rows-[20px_1fr_20px] justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
              <main className="flex flex-col gap-8 row-start-2 items-center w-full">
                <div>
                    <Typography variant="h2" component="h1" color="text.secondary">
                        {title}
                    </Typography>
                </div>
                <div className="flex flex-row gap-12 w-full max-w-4xl justify-center">
                    {children}
                </div>
              </main>
            </Container>
  );
}