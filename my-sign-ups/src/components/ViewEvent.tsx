import { EventData } from "@/types/eventData"
import { Grid2, Button, Box, Tab, Tabs } from "@mui/material"
import { EventForm } from "./forms/EventForm"
import SignUpForm from "./forms/SignUpForm"
import MyDialog from "./MyDialog"
import { useState } from "react"
import { State } from "@/app/page"
import { ObjectId } from "mongodb"
import { deleteEvent, submitSignUps, updateEvent } from "@/app/utils/api"
import { SignUpData } from "@/types/signUps"

type EventViewProps = {
    eventData: EventData,
    refreshEvents: () => void,
    openDialog: boolean,
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
    showToaster: State,
    getSignUps: (id:ObjectId) => void,
    signUps: string[] | null,
    setShowToaster: (open:boolean,msg:string,severity:'success'|'error') => void,
}

export default function EventView({eventData, refreshEvents,openDialog,setOpenDialog,setShowToaster,signUps,getSignUps}: EventViewProps){
const [toggleUpdate, setToggleUpdate] = useState(false);
  const [signUpTabs, setSignUpTabs] = useState(0);
    const [signUpReadonly, setSignUpReadonly] = useState(true);
      
  const deleteEventFetch = async (id: ObjectId) => {
    try {
      await deleteEvent(id);
      refreshEvents();
      setOpenDialog(false);
      setShowToaster(true,'Event deleted successfully','success');
    } catch (error) {
      console.error(error);
    }
  };

    const onSubmit = async (data: EventData) => {
      try {
        await updateEvent(data);
        refreshEvents();
        setOpenDialog(true);
        setToggleUpdate(false);
        setShowToaster(true,'Event updated successfully','success');
      } catch (error) {
        setShowToaster(true,'Error updating event','error');
      }
    };
    
      const onSubmitSignUps = async (data: SignUpData) => {
        try {
          await submitSignUps(data);
          setShowToaster(true,'Sign ups added successfully','success');
        } catch (error) {
            setShowToaster(true,'Error adding sign ups','error');
        }
      };
    

      function a11yProps(index: number) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

        const tabs = <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={signUpTabs} onChange={(event: React.SyntheticEvent, newValue: number) => {
                getSignUps(eventData._id);
              setSignUpTabs(newValue);
            }} aria-label="basic tabs example">
              <Tab label="Event Info" disabled={signUpTabs === 0} {...a11yProps(0)} />
              <Tab label="Sign Ups" disabled={signUpTabs === 1} {...a11yProps(1)} onClick={() => setSignUpReadonly(true)}/>
            </Tabs>
          </Box>
        </Box>

        const actions = <Grid2 container columnSpacing={0} direction={'row'} sx={{ p: 2 }}>
          {!toggleUpdate && <>
            <Grid2 size={4}>
              <Button variant="contained" color="error" sx={{ width: "90%" }} onClick={() => deleteEventFetch(eventData._id)} disabled={false}>
                Delete Event
              </Button>
            </Grid2>
            <Grid2 size={4}>
              <Button variant="contained" color="info" sx={{ width: "90%" }} onClick={() => setToggleUpdate(true)} disabled={false}>
                Edit Event
              </Button>
            </Grid2>
            <Grid2 size={4}>
              <Button variant="contained" color="success" sx={{ width: "90%" }} onClick={() => { setSignUpReadonly(false); setSignUpTabs(1) }} disabled={false}>
                Add Sign Ups
              </Button>
            </Grid2>
          </>
          }
        </Grid2>
    
        const submit = toggleUpdate && eventData && <Grid2 size={12}>
          <Button variant="contained" color="info" sx={{ width: "100%" }} type="submit" disabled={false}>
            Update Event
          </Button>
        </Grid2>
    
        const onDialogClose = () => {
          setToggleUpdate(false);
        }

        return eventData && <>
          <MyDialog title={eventData.name} open={openDialog} setOpen={(val) => setOpenDialog(val)} onClose={() => onDialogClose()}>
            {tabs}
            {signUpTabs === 0 && <EventForm onSubmit={onSubmit} readonly={!toggleUpdate} existingEvent={eventData} submitButton={submit} actionButtons={actions} />}
            {signUpTabs === 1 && <SignUpForm signUps={signUps} readonly={signUpReadonly} readonlyUpdate={(val) => setSignUpReadonly(val)} eventId={eventData._id} onSubmit={onSubmitSignUps} />}
          </MyDialog>
        </>

}