import { Box, Container, Stack, Typography } from "@mui/material";

type PageWrapperProps = {
  title: string;
  children: React.ReactNode;
}


export default function PageWrapper({ title, children }: PageWrapperProps) {
  return (
    <main>
      <Container sx={{ bgcolor: "background.default" }}  className="justify-center min-h-screen font-[family-name:var(--font-geist-sans)]" >
        <Stack direction='column' spacing={3} alignItems="center" marginTop={2}>
          <Box>
            <Typography variant="h2" component="h1" color="text.secondary">
              {title}
            </Typography>
          </Box>
          <Box>
            {children}
          </Box>
        </Stack>
      </Container>
    </main>
  );
}