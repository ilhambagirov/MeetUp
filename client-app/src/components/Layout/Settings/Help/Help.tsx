import React, { ChangeEvent } from "react";
import { ExpandMoreOutlined } from "@material-ui/icons";
import './Help.scss'
import '../../Main/Main.scss'
import { Accordion, AccordionSummary, Typography, AccordionDetails } from "@material-ui/core";



export default function Help() {
    const [expanded, setExpanded] = React.useState(-1);

    const handleSharedropforposts = (id: number) => {
        expanded !== id ? setExpanded(id) : setExpanded(-1)
    }
    return (
        <div className='main-content'>
            <div className='help-wrapper'>
                <div className="row justify-content-center">
                    <div className="col-xl-10 mt-3">
                        <Accordion expanded={expanded === 0} onClick={() => handleSharedropforposts(0)}>
                            <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
                                <Typography>
                                    What is Meet Up?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                This is a popular Social Netork Platform
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 1} onClick={() => handleSharedropforposts(1)}>
                            <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
                                <Typography>
                                    What is Meet Up?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                This is a popular Social Netork Platform
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 2} onClick={() => handleSharedropforposts(2)}>
                            <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
                                <Typography>
                                    What is Meet Up?
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                This is a popular Social Netork Platform
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>


    )
}