import _ from "lodash";
import React, {Component} from "react";

const NavBarMobile = ({children, leftItems, onPusherClick, onToggle, rightItems, visible}) => (
    <div>Navbar</div>
    // <Sidebar.Pushable>
    //     <Sidebar
    //         as={Menu}
    //         animation="overlay"
    //         icon="labeled"
    //         inverted
    //         vertical
    //         visible={visible}
    //     >{_.map(leftItems, item => <List.Item {...item}/>)}</Sidebar>
    //     <Sidebar.Pusher
    //         dimmed={visible}
    //         onClick={onPusherClick}
    //         children={leftItems}
    //         style={{minHeight: "100vh"}}>
    //         <Menu fixed="top" inverted>
    //             <Menu.Item onClick={onToggle}>
    //                 <Icon name="sidebar"/>
    //             </Menu.Item>
    //             <Menu.Menu position="right">
    //                 {_.map(rightItems, item => <Menu.Item {...item}/>)}
    //             </Menu.Menu>
    //         </Menu>
    //         {children}
    //     </Sidebar.Pusher>
    // </Sidebar.Pushable>
);

const NavBarDesktop = ({leftItems, rightItems}) => (
    <nav class="d-grid">
        <div class="d-flex">
            {leftItems.map(item => item)}
        </div>
    </nav>
);

export class NavBar extends Component {
    state = {
        visible: false
    };

    handlePusher = () => {
        const {visible} = this.state;
        if (visible) this.setState({visible: false});
    };

    handleToggle = () => this.setState({visible: !this.state.visible});

    render() {
        const {children, leftItems, rightItems} = this.props;
        const {visible} = this.state;

        return (
            <>
                <NavBarDesktop leftItems={leftItems} rightItems={rightItems}/>
                <div>{children}</div>
            </>
        /*<Responsive {...Responsive.onlyMobile}>
            <NavBarMobile
                leftItems={leftItems}
                onPusherClick={this.handlePusher}
                onToggle={this.handleToggle}
                rightItems={rightItems}
                visible={visible}
            >
                <NavBarChildren>{children}</NavBarChildren>
            </NavBarMobile>
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.minWidth}>
            <NavBarDesktop leftItems={leftItems} rightItems={rightItems}/>
            <NavBarChildren>{children}</NavBarChildren>
        </Responsive>*/
        );
    }
}
