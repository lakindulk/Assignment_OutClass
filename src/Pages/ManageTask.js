import React, { useContext, useState } from "react";
import PropTypes from 'prop-types';
import { Typography, TextField, Box, Tab, Tabs, Card, Button, Select, MenuItem, InputLabel, Grid } from "@mui/material";
import Alert from '@mui/material/Alert';
import { v4 as uuidv4 } from 'uuid';
import { TaskContext } from '../contexts/ToDotask';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme'
import '../Pages/main.css'

function TabPanel(props) {
    const { children, value, index, ...other } = props;


    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ManageTask() {
    const [value, setValue] = React.useState(0);
    const { tasks, deleteTask, editTask, addTask } = useContext(TaskContext);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [id, setid] = useState('');
    const [alert, setAlert] = useState(false);
    const [alertContent, setAlertContent] = useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            id: uuidv4(),
            title,
            description,
            status,
            dueDate,
        };
        addTask(newTask);
        console.log(tasks);
        setAlertContent('New Task Added  |Click Me To Close|');
        setAlert(true);
        setTitle('');
        setDescription('');
        setStatus('not completed');
        setDueDate('');

    };

    const handleEdit = (id, title, description, status, dueDate) => {
        setIsEditing(true);
        setid(id);
        setTitle(title);
        setDescription(description);
        setStatus(status);
        setDueDate(dueDate);
    };

    const deleteTasks = (id) => {
        deleteTask(id);
        setAlertContent('Task Removed  |Click Me To Close|');
        setAlert(true);
    };

    const handleSave = () => {
        const editedTask = {
            id, title, description, status, dueDate
        }
        editTask(editedTask);
        setIsEditing(false);
        setAlertContent('Task Edited Successfully  |Click Me To Close|');
        setAlert(true);
        setid('');
        setTitle('');
        setDescription('');
        setStatus('');
        setDueDate('');
    };
    return (
        <div>
            <ThemeProvider theme={theme}>

                {alert ? <Alert
                    onClick={() => {
                        setAlert(false);
                    }}
                    sx={{ mb: 2 }}
                >
                    {alertContent}
                </Alert> : <></>}
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Add Task" {...a11yProps(0)} />
                            <Tab label="View Task" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <div className="bottom">
                            <Typography variant="h4" color='primary'> Task Management</Typography>
                        </div>
                        <div className="mainCard">
                            <Card sx={{ maxWidth: 1300 }} >
                                <div className="cardstyle">
                                    <form onSubmit={handleSubmit}>

                                        <div className="bottom">
                                            <TextField
                                                id="outlined-multiline-flexible"
                                                label="Title"
                                                onChange={(e) => setTitle(e.target.value)}
                                                fullWidth
                                                required
                                                multiline
                                                value={title}
                                                maxRows={1}
                                                color="primary"
                                            />
                                        </div>

                                        <div className="bottom">
                                            <TextField
                                                id="outlined-multiline-flexible"
                                                label="description"
                                                onChange={(e) => setDescription(e.target.value)}
                                                multiline
                                                fullWidth
                                                required
                                                value={description}
                                                maxRows={5}
                                                color="primary"
                                            />
                                        </div>
                                        <div className="bottom">

                                            <Select
                                                id="status"
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                                fullWidth
                                            >
                                                <InputLabel > Status</InputLabel>

                                                <MenuItem value="not completed">Not Completed</MenuItem >
                                                <MenuItem value="completed">Completed</MenuItem >
                                            </Select >
                                        </div>

                                        <div className="bottom">

                                            <TextField
                                                type="date"
                                                id="dueDate"
                                                value={dueDate}
                                                onChange={(e) => setDueDate(e.target.value)}
                                                fullWidth
                                            />
                                        </div>

                                        <Button variant="contained" fullWidth type="submit">Add Task</Button>
                                    </form>
                                </div>
                            </Card>
                        </div>

                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div className="bottom">
                            <Typography variant="h4" color='primary'> Manage Tasks</Typography>
                        </div>
                        {isEditing ? (
                            <div className="mainCard">
                                <Card >
                                    <div className="cardstyle">
                                        <Grid container spacing={2}>
                                            <Grid item xs={6}>

                                                <div className="bottom">
                                                    <TextField
                                                        id="outlined-multiline-flexible"
                                                        label="Title"
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        fullWidth
                                                        required
                                                        multiline
                                                        value={title}
                                                        maxRows={1}
                                                        color="primary"
                                                    />
                                                </div>

                                            </Grid>
                                            <Grid item xs={6}>
                                                <div className="bottom">

                                                    <Select
                                                        id="status"
                                                        value={status}
                                                        onChange={(e) => setStatus(e.target.value)}
                                                        fullWidth
                                                    >
                                                        <InputLabel > Status</InputLabel>

                                                        <MenuItem value="not completed">Not Completed</MenuItem >
                                                        <MenuItem value="completed">Completed</MenuItem >
                                                    </Select >
                                                </div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div className="bottom">
                                                    <TextField
                                                        id="outlined-multiline-flexible"
                                                        label="description"
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        multiline
                                                        fullWidth
                                                        required
                                                        value={description}
                                                        maxRows={5}
                                                        color="primary"
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <div className="bottom">

                                                    <TextField
                                                        type="date"
                                                        id="dueDate"
                                                        value={dueDate}
                                                        fullWidth
                                                        onChange={(e) => setDueDate(e.target.value)}
                                                    />
                                                </div>
                                            </Grid>
                                        </Grid>


                                        <Button variant="contained" fullWidth onClick={handleSave}>Save</Button>
                                    </div>


                                </Card>

                            </div>
                        ) : (
                            <div>
                                {tasks.map(tasks => {
                                    return (
                                        <div className="mainCardnew" key={tasks.id}>
                                            <Card
                                                sx={{ maxWidth: 700 }}

                                            >


                                                <div className="cardsdata" >
                                                    <Typography variant="h6" color='primary'>Title: {tasks.title}</Typography>
                                                    <Typography variant="h6" color='primary'>Description: {tasks.description}</Typography>
                                                    <Typography variant="h6" color='primary'>Status: {tasks.status}</Typography>
                                                    <Typography variant="h6" color='primary'>Due Date: {tasks.dueDate}</Typography>


                                                    <div className="cardsbutton">
                                                        <Button variant="contained" color="secondary"

                                                            onClick={() => deleteTasks(tasks.id)}
                                                        >delete</Button> {' '}
                                                        <Button variant="contained"
                                                            onClick={() => handleEdit(tasks.id, tasks.title, tasks.description, tasks.status, tasks.dueDate)}>Edit</Button>
                                                    </div>

                                                </div>
                                            </Card>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                    </TabPanel>

                </Box>

            </ThemeProvider>
        </div>

    );
}