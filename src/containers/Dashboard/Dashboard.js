import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import {
    Contacts,
    BankAccount,
    SalesInvoice,
    Details,
    BankAccountCreator,
    SalesInvoiceCreator,
    ContactCreator,
    Organizations,
    SalesInvoiceDetails,
    Persons,
    OrganizationsCreator,
    PersonCreator,
    InvoiceLineCreator,
    Products,
    ProductsCreator,
    SocialPlatform,
    SocialPlatformCreator,
    OrganizationDetails,
    PersonDetails,
    Project,
    ProjectCreator,
    ProjectLog,
    ProjectLogCreator
} from '../../pages';
import clsx from 'clsx';
import { Redirect, Switch } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import { Drawer, makeStyles } from '@material-ui/core';
import NavBar from '../../components/nav-bar';
import TopBar from '../../components/top-bar';
import PrivateRouter from '../../components/private-route';
import Breadcrumbs from '../../components/breadcrumbs';

const useStyles = makeStyles(theme => ({
    mainContainer: {
        position: 'relative',
        padding: '12px 24px',
        [theme.breakpoints.down('md')]: {
            padding: 12,
            paddingTop: 64
        }
    },
    container: {
        position: 'relative',
        display: 'flex',
    },
    content: {
        overflow: 'hidden',
        boxSizing: 'border-box',
        flexGrow: 1,
        marginLeft: -192,
        paddingTop: '12px',
        paddingBottom: '12px',
        background: '#fff',
        transition: 'all .15s ease-in',
        zIndex: 99,
        [theme.breakpoints.down('md')]: {
            marginLeft: 0
        },
    },
    loginContent: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f0f7ff'
    },
    contentShift: {
        marginLeft: 0,
        paddingLeft: 22,
        transition: 'all .15s ease-in',
        [theme.breakpoints.down('md')]: {
            marginLeft: 0,
            paddingLeft: 0
        },
    },
    sidebar: {
        position: 'relative',
        paddingTop: '12px',
        paddingBottom: '12px',
        opacity: 1,
        transition: 'all .15s ease-in',
        [theme.breakpoints.down('md')]: {
            position: 'fixed',
            top: 64,
            left: 12
        },
    },
    sidebarShift: {
        transition: 'all .15s ease-in',
        opacity: 0
    },
    drawer: {
        boxSizing: 'border-box',
        width: 192,
        position: 'relative',
        [theme.breakpoints.down('md')]: {
            width: 45
        },
    },
    drawerOpen: {
        width: 192,
        transition: 'all .15s ease-in',
        [theme.breakpoints.down('md')]: {
            width: 45
        },
    },
    paper: {
        position: 'static',
        borderRight: 'none'
    }
}))

const Dashboard = () => {
    const classes = useStyles();
    const isTabletOrMobile = useMediaQuery({
        query: '(max-width: 1280px)'
    })
    const [open, setOpen] = useState(true);
    const { location } = useReactRouter();

    useEffect(() => {
        if (isTabletOrMobile) {
            setOpen(false);
        }
    }, [location.pathname, isTabletOrMobile]);

    return (
        <>
            <TopBar
                toggleMenuShown={() => setOpen(!open)}
            />
            <div className={classes.mainContainer}>
                {isTabletOrMobile ? <Breadcrumbs /> : null}
                <div className={classes.container}>
                    {!isTabletOrMobile ? (
                        <div className={clsx(classes.sidebar, {
                            [classes.sidebarShift]: !open
                        })}>
                            <Drawer
                                className={classes.drawer}
                                classes={{
                                    paper: classes.paper
                                }}
                                variant="permanent"
                                open={open}
                            >
                                <NavBar />
                            </Drawer>
                        </div>
                    ) : (
                            <Drawer
                                variant="temporary"
                                open={open}
                                onClose={() => setOpen(!open)}
                                BackdropProps={{
                                    invisible: true
                                }}
                                PaperProps={{
                                    style: {
                                        top: 65,
                                        maxWidth: 192,
                                        width: '100%'
                                    }
                                }}
                            >
                                <NavBar />
                            </Drawer>
                        )
                    }
                    <div className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                    >
                        {/* router order must be followed */}
                        <Switch>
                            <PrivateRouter path="/contact/create-entity" exact component={ContactCreator} />
                            <PrivateRouter path="/contact" exact component={Contacts} />
                            <PrivateRouter path="/contact/:id" exact component={Details} />
                            <PrivateRouter path="/bank-account/create-entity" exact component={BankAccountCreator} />
                            <PrivateRouter path="/bank-account" exact component={BankAccount} />
                            <PrivateRouter path="/bank-account/:id" exact component={Details} />
                            <PrivateRouter path="/sales-invoice/create-entity" exact component={SalesInvoiceCreator} />
                            <PrivateRouter path="/sales-invoice" exact component={SalesInvoice} />
                            <PrivateRouter path="/sales-invoice/:id" exact component={SalesInvoiceDetails} />
                            <PrivateRouter path="/organization/create-entity" exact component={OrganizationsCreator} />
                            <PrivateRouter path="/organization" exact component={Organizations} />
                            <PrivateRouter path="/organization/:id" exact component={OrganizationDetails} />
                            <PrivateRouter path="/person/create-entity" exact component={PersonCreator} />
                            <PrivateRouter path="/person" exact component={Persons} />
                            <PrivateRouter path="/person/:id" exact component={PersonDetails} />
                            <PrivateRouter path="/invoiceline" exact component={InvoiceLineCreator} />
                            <PrivateRouter path="/product/create-entity" exact component={ProductsCreator} />
                            <PrivateRouter path="/product" exact component={Products} />
                            <PrivateRouter path="/product/:id" exact component={Details} />
                            <PrivateRouter path="/social-platform/create-entity" exact component={SocialPlatformCreator} />
                            <PrivateRouter path="/social-platform" exact component={SocialPlatform} />
                            <PrivateRouter path="/social-platform/:id" exact component={Details} />
                            <PrivateRouter path="/project/create-entity" exact component={ProjectCreator}/>
                            <PrivateRouter path="/project" exact component={Project}/>
                            <PrivateRouter path="/project/:id" exact component={Details}/>
                            <PrivateRouter path="/project-log/create-entity" exact component={ProjectLogCreator}/>
                            <PrivateRouter path="/project-log" exact component={ProjectLog}/>
                            <PrivateRouter path="/project-log/:id" exact component={Details}/>
                            <Redirect to="/sales-invoice" />
                        </Switch>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;