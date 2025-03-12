import { TextField, Divider, Button, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from "@mui/material";
import { register } from "module";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { BasicEventType, EventTypeFeatures } from "@/types/eventTypes";


type EventTypeFormProps = 
{
    onSubmit: (data: any) => void
}

export default function EventTypeForm({onSubmit}:EventTypeFormProps) {
  const [numberOfRoles, setNumberOfRoles] = React.useState(0);
    const roleLimitReached = () => numberOfRoles >= 4;
    const incrementRoles = () => {
        if (!roleLimitReached()) {
            setNumberOfRoles(numberOfRoles + 1);
        }
    }

        const {
            register,
            handleSubmit,
            watch,
            formState: { errors },
        } = useForm<BasicEventType>()

        const OPTIONS = {
            BASIC: "Basic",
            ROLES: "Roles",
          } as const;

          type OptionKeys = keyof typeof OPTIONS;
        const roleSection = 
            <Button variant='contained' color='primary' onClick={() => {
                incrementRoles();
            }} sx={{ float: 'right', marginBottom: '25px' }}>
                <AddCircleIcon />
            </Button>;
        
const [selectedFeature, setSelectedFeature] = useState<OptionKeys>("BASIC");

  const featureRadios =    <FormControl>
  <FormLabel>Form Type</FormLabel>
  <RadioGroup
    value={selectedFeature}
    onChange={(event) => setSelectedFeature(event.target.value as OptionKeys)}
  >
    {Object.entries(OPTIONS).map(([key, label]) => (
      <FormControlLabel key={key} value={key} control={<Radio />} label={label} />
    ))}
  </RadioGroup>
</FormControl>


    return <form onSubmit={handleSubmit(onSubmit)} className='px-5'>
        
        {featureRadios}
        <div className="</div>flex m-6">
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
        {/* {selectedFeature == "ROLES" && <>
        <h3>Roles</h3>
        <Divider />
        {Array.from({ length: numberOfRoles }).map((_, index) => (
            <div key={index} className="m-6">
            <TextField className="w-6/6" required placeholder="Role" {...register(`roles.${index}`)} />
            </div>
        ))}
        <div className='m-6'>
            {numberOfRoles > 0 && <Button variant='contained' color='secondary' onClick={() => { setNumberOfRoles(numberOfRoles - 1); }}>
                <RemoveCircleIcon />
            </Button>}

            {!roleLimitReached() && roleSection}
        </div>
        </>
        } */}
        <Button variant="contained" type="submit" className="w-full h-10 bg-green-500/10 hover:bg-green-500/50 cursor-pointer">Add Event Type</Button>
    </form>
}