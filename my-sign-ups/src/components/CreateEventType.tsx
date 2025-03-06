'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Checkbox, Divider, FormControlLabel, FormGroup, Icon, TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: string) => {
        onClose(value);
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<EventTypeInputs>()

    const onSubmit: SubmitHandler<EventTypeInputs> = (data: EventTypeInputs) => {
        fetch("/api/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
        });
    }
    const [numberOfRoles, setNumberOfRoles] = React.useState(0);
    const roleLimitReached = () => numberOfRoles >= 4;
    const incrementRoles = () => {
        if (!roleLimitReached()) {
            setNumberOfRoles(numberOfRoles + 1);
        }
    }


    const roleInput = <div className="flex m-3">
        <TextField className="w-6/6" required placeholder="Role" {...register("location")} />
    </div>;

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Add Event Type</DialogTitle>
            <form onSubmit={() => { }} className='px-5'>
                <div className="flex m-6">
                    <TextField className="w-6/6" required placeholder="Event Type Name" {...register("eventTypeName")} />
                </div>
                <div className="flex m-6">
                    <TextField className="w-6/6" required placeholder="Description (optional)" {...register("description")} />
                </div>
                <div className="flex m-6">
                    <TextField className="w-6/6" required placeholder="Location" {...register("location")} />
                </div>
                <div className="flex m-6">
                    <TextField className="w-6/6" type="number" placeholder="Capacity (leave blank for unlimited)" {...register("capacity")} />
                </div>
                <h3>Roles</h3>
                <Divider/>
                {Array.from({ length: numberOfRoles }).map((_, index) => (
                    <div key={index} className="m-6">
                        <TextField className="w-6/6" required placeholder="Role" {...register(`roles.${index}`)} />
                    </div>
                ))}
                <div className='m-6'>
                { numberOfRoles > 0 && <Button variant='contained' color='secondary' onClick={() => {setNumberOfRoles(numberOfRoles - 1);}}>
                    <RemoveCircleIcon/>
                </Button>}
                
                {!roleLimitReached() &&
                    <Button  variant='contained' color='primary' onClick={() => {
                        incrementRoles();
                    }} sx={{ float: 'right',marginBottom: '25px'}}>
                        <AddCircleIcon/>
                    </Button>
                }
                </div>
            </form>
        </Dialog>
    );
}

export default function SimpleDialogDemo() {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
        setSelectedValue(value);
    };

    return (
        <div>
            <Typography variant="subtitle1" component="div">
                Selected: {selectedValue}
            </Typography>
            <br />
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Event Type
            </Button>
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
            />
        </div>
    );
}
