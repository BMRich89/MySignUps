import { EventData } from "@/types/eventData";
import { Button, ButtonGroup, Grid2, TextField } from "@mui/material";
import { FieldArrayWithId, UseFieldArrayAppend, UseFieldArrayRemove, UseFormRegister } from "react-hook-form";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

type RoleFormInputs = {
    readonly: boolean,
    fields: FieldArrayWithId<EventData, "roles", "id">[],
    roleLimitReached: () => boolean,
    register: UseFormRegister<EventData>,
    append: UseFieldArrayAppend<EventData, "roles">,
    remove: UseFieldArrayRemove
}

export default function RoleForm({ readonly, fields, roleLimitReached, register, append, remove }: RoleFormInputs) {

    const incrementRoles = () => {
        if (!roleLimitReached()) {
            append({ role: "", limit: 0 });
        }
    };

    const filteredFields = readonly ? fields.filter((f) => readonly && f.limit != 0) : fields;
    return (
        <>
            {filteredFields.map((field, index) => (
                <Grid2 container spacing={1} key={field.id}>
                    <Grid2 size={8}>
                        <Grid2 container spacing={1}>
                            <Grid2 size={8}>
                                <TextField
                                    required
                                    placeholder="Role"
                                    {...register(`roles.${index}.role`)} />
                            </Grid2>
                            <Grid2 size={4}>
                                <TextField
                                    required
                                    placeholder="Limit"
                                    type="number"
                                    {...register(`roles.${index}.limit`)} />
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
}