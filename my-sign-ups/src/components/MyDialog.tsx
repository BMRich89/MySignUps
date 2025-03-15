import { EventData } from "@/types/eventData";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid2, Stack } from "@mui/material";
import React from "react";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
interface MyDialogProps {
    title: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
}

export default function MyDialog({ title, open,setOpen, children }: MyDialogProps) {
    return (
        <>   
            <Dialog open={open} onClose={() => { }} >
                <Grid2 container>
                    <Grid2 size={11}>
                        <DialogTitle sx={{marginTop:.5}}>{title}</DialogTitle>
                    </Grid2>
                    <Grid2 size={1}>
                    <DialogActions>
                    <Button
                        sx={{ color: "secondary.main", ":hover": {color:"secondary.dark" }}}
                        onClick={() => setOpen(false)}>
                        <DisabledByDefaultIcon fontSize="large"/>
                    </Button>
                </DialogActions>
                    </Grid2>
                </Grid2>           
                {children}
            </Dialog>
        </>
    );
}