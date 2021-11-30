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

                        <form action="">
                            <div className="row align-items-center">
                                <div className="col-lg-9 col-12 mb-3">
                                    <label htmlFor="">Other</label>
                                    <input className='d-block form-control' type="text" />
                                </div>
                                <div className='col-lg-3 col-12 mb-3'>
                                    <a className='save-btn' href="">Send</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}