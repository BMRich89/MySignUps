import React, { useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { TextField, Button, InputLabel, FormControl, Divider, Checkbox, FormControlLabel, FormGroup, Stack, Paper, Box, Tabs, Tab, Grid, Grid2, ButtonGroup } from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

type EventFormProps = {
    onSubmit: (data: any) => void
}

type Inputs = {
    eventName: string,
    eventDate: Date,
    description: string,
    location: string,
    capacity: null | number,
    roles: { value: string }[]
}

export function EventForm({ onSubmit }: EventFormProps) {
    const { register, control, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
        defaultValues: {
            roles: [{ value: "" }] // Initialize with one role field
        }
    });

    const [capTabs, setCapTabs] = useState(0);
    const [limitedAttendees, setLimitedAttendees] = useState(false);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setCapTabs(newValue);
    };

    const { fields, append, remove } = useFieldArray({
        control,
        name: "roles",
    });

    const roleLimitReached = () => fields.length >= 4;
    const incrementRoles = () => {
        if (!roleLimitReached()) {
            append({ value: "" });
        }
    };

    const roleForm = (
        <>
            {fields.map((field, index) => (
                <Grid2 container spacing={1}  key={field.id} >
                    <Grid2 size={8}>
                        <TextField
                         
                            required
                            placeholder="Role"
                            {...register(`roles.${index}.value`)}
                        />
                    </Grid2>
                    <ButtonGroup size="small" aria-label="small button group">
                        {
                            fields.length > 1 &&  <Button
                            variant='contained'
                            color='error'
                            onClick={() => remove(index)}
                        >
                            <RemoveCircleIcon />
                        </Button>
                        }
                       
                    
                    {!roleLimitReached() && (
                        
                            <Button
                                variant='contained'
                                color='success'
                                onClick={incrementRoles}
                            >
                                <AddCircleIcon />
                            </Button>
                        
                    )}
                    </ButtonGroup>
                </Grid2>
            ))}
        </>
    );

    return (
        <Paper>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2} sx={{ maxWidth: 500, margin: "auto" }}>
                    {/* Event Date */}
                    <FormControl fullWidth>
                        <InputLabel shrink>Event Date</InputLabel>
                        <TextField type="date" required {...register("eventDate")} />
                    </FormControl>

                    {/* Event Name */}
                    <FormControl fullWidth>
                        <TextField label="Event Name" required {...register("eventName")} />
                    </FormControl>

                    {/* Description */}
                    <FormControl fullWidth>
                        <TextField label="Description (optional)" multiline rows={3} {...register("description")} />
                    </FormControl>

                    {/* Location */}
                    <FormControl fullWidth>
                        <TextField label="Location" required {...register("location")} />
                    </FormControl>

                    {/* Limit Attendees Checkbox */}
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onChange={() => {
                                        setLimitedAttendees(!limitedAttendees)
                                    }}
                                    sx={{
                                        color: "primary.main",
                                        '&.Mui-checked': {
                                            color: "secondary.main",
                                        },
                                    }}
                                />
                            }
                            label="Limit attendees?"
                            labelPlacement="start"
                        />
                    </FormGroup>
                    {limitedAttendees && (
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={capTabs} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Capacity" {...a11yProps(0)} />
                                <Tab label="By Role" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                    )}
                    {capTabs === 1 && limitedAttendees && roleForm}
                    {capTabs === 0 && limitedAttendees && <FormControl fullWidth>
                        <TextField label="Capacity" required {...register("capacity")} />
                    </FormControl>}
                    <Button variant="contained" type="submit" color='secondary'>Add Event</Button>
                </Stack>
            </form>
        </Paper>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}