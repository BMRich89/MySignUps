import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
    TextField,
    Button,
    InputLabel,
    FormControl,
    Divider,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Stack,
    Paper,
    Box,
    Tabs,
    Tab,
    Grid2,
    ButtonGroup,
} from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { EventData } from "@/types/eventData";

type EventFormProps = {
    onSubmit: (data: any) => void;
    readonly: boolean;
    existingEvent: EventData | null;
};

export function EventForm({ onSubmit, readonly, existingEvent }: EventFormProps) {
    const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<EventData>({
        defaultValues: {
            roles: [{ role: "", limit: 0 }],
        },
    });

    const [capTabs, setCapTabs] = useState(0);
    const [limitedAttendees, setLimitedAttendees] = useState<boolean>(existingEvent?.limitedAttendees ?? false);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setCapTabs(newValue);
        setValue("rolesLimited", newValue === 1);
    };

    const { fields, append, remove } = useFieldArray({
        control,
        name: "roles",
    });

    useEffect(() => {
        if (existingEvent) {
            setValue("name", existingEvent.name);
            setValue("date", existingEvent.date);
            setValue("description", existingEvent.description);
            setValue("location", existingEvent.location);
            setValue("capacity", existingEvent.capacity);
            setValue("limitedAttendees", existingEvent.limitedAttendees);
            setValue("rolesLimited", existingEvent.rolesLimited);
            
            existingEvent.roles.forEach((role, index) => {
                if (index > 0) append({ role: "", limit: 0 });
                setValue(`roles.${index}.role`, role.role);
                setValue(`roles.${index}.limit`, role.limit);
            });
        }
    }, [existingEvent, setValue, append]);

    const roleLimitReached = () => fields.length >= 4;
    
    const incrementRoles = () => {
        if (!roleLimitReached()) {
            append({ role: "", limit: 0 });
        }
    };

    const roleForm = (
        <>
            {fields.map((field, index) => (
                <Grid2 container spacing={1} key={field.id}>
                    <Grid2  size={8}>
                        <Grid2 container spacing={1}>
                            <Grid2  size={8}>
                                <TextField
                                    required
                                    placeholder="Role"
                                    {...register(`roles.${index}.role`)}
                                />
                            </Grid2>
                            <Grid2  size={4}>
                                <TextField
                                    required
                                    placeholder="Limit"
                                    type="number"
                                    {...register(`roles.${index}.limit`)}
                                />
                            </Grid2>
                        </Grid2>
                    </Grid2>
                    <ButtonGroup size="small">
                        {fields.length > 1 && (
                            <Button variant="contained" color="error" onClick={() => remove(index)}>
                                <RemoveCircleIcon />
                            </Button>
                        )}
                        {!roleLimitReached() && (
                            <Button variant="contained" color="success" onClick={incrementRoles}>
                                <AddCircleIcon />
                            </Button>
                        )}
                    </ButtonGroup>
                </Grid2>
            ))}
        </>
    );

    return (
        <Paper sx={{ padding: '3rem', margin: 'auto' }}>
            <fieldset disabled={readonly}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                        {/* Event Date */}
                        <FormControl fullWidth>
                            <InputLabel shrink>Event Date</InputLabel>
                            <TextField type="date" required {...register("date")} />
                        </FormControl>

                        {/* Event Name */}
                        <FormControl fullWidth>
                            <TextField label="Event Name" required {...register("name")} />
                        </FormControl>

                        {/* Description */}
                        <FormControl fullWidth>
                            <TextField
                                label="Description (optional)"
                                multiline
                                rows={3}
                                {...register("description")}
                            />
                        </FormControl>

                        {/* Location */}
                        <FormControl fullWidth>
                            <TextField label="Location" required {...register("location")} />
                        </FormControl>

                        {/* Limit Attendees Checkbox */}
                        <FormGroup>
                            <Controller
                                control={control}
                                name="limitedAttendees"
                                render={() => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={limitedAttendees}
                                                {...register("limitedAttendees")}
                                                onChange={() => setLimitedAttendees(!limitedAttendees)}
                                                sx={{
                                                    color: "primary.main",
                                                    '&.Mui-checked': { color: "secondary.main" },
                                                }}
                                            />
                                        }
                                        label="Limit attendees?"
                                        labelPlacement="start"
                                    />
                                )}
                            />
                        </FormGroup>

                        {/* Conditional Capacity and Roles Tabs */}
                        {limitedAttendees && (
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={capTabs} onChange={handleChange} aria-label="Capacity tabs">
                                    <Tab
                                        label="Capacity"
                                        {...a11yProps(0)}
                                    />
                                    <Tab
                                        label="By Role"
                                        {...a11yProps(1)}
                                    />
                                </Tabs>
                            </Box>
                        )}

                        {/* Role-based Capacity */}
                        {limitedAttendees && watch("rolesLimited") && roleForm}

                        {/* General Capacity Field */}
                        {limitedAttendees && !watch("rolesLimited") && (
                            <FormControl fullWidth>
                                {(readonly && watch("capacity")) || !readonly ? (
                                    <TextField
                                        label="Capacity"
                                        placeholder="(leave blank for unlimited)"
                                        {...register("capacity")}
                                    />
                                ) : null}
                                {readonly && !watch("capacity") && (
                                    <TextField label="Capacity" value="Unlimited" />
                                )}
                            </FormControl>
                        )}

                        {/* Submit Button */}
                        {!readonly && (
                            <Button variant="contained" type="submit" color="secondary">
                                Add Event
                            </Button>
                        )}
                    </Stack>
                </form>
            </fieldset>
        </Paper>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
