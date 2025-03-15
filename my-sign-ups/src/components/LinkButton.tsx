
'use client'

import { Box, Button, Paper, Stack, Typography } from "@mui/material"

type LinkButtonProps = {
    title: string,
    icon: React.ReactNode
    link?: string,
    component?:"a" | "button",
    clickHandler?: () => void
}


export default function LinkButton({ title,icon,link,clickHandler, component }: LinkButtonProps) {
    return <Button fullWidth variant="contained" component={!component ? "button" : component} sx={{height:"100%",color:'primary.dark.500', textAlign:'center'}} onClick={clickHandler} href={link}>
        <Stack>
                <Box>
                  {icon}
                </Box>
                <Box>
                  <Typography variant="h6" sx={{m:2}}>{title}</Typography>
                </Box>
              </Stack>
    </Button> 
}