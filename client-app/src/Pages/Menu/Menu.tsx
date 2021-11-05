import {
    gql,
    useQuery
} from "@apollo/client";
import { useEffect, useState, useContext } from "react";
import { Item } from "../../Models/Item";
import { ItemInventory } from "../../Models/ItemInventory";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ContextAuth } from "../../Shared/itemstore";
import Divider from '@material-ui/core/Divider';

interface ItemInventoryData {
    itemInventory: ItemInventory[];
}

export default function Menu() {

    const MENU_ITEMS = gql`
        query Query {
            itemInventory{
                itemType,
                items {
                    itemID,
                    name,
                    description,
                    price,
                    image
                }
            }
        }
    `;

    const [menuItems, setMenuItems] = useState<ItemInventory[]>([]);
    const [accordionsOpenClose, setAccordionsOpenClose] = useState<boolean[]>([]);
    const itemContext = useContext(ContextAuth);
    const { data, loading, error } = useQuery<ItemInventoryData>(MENU_ITEMS, {fetchPolicy: "network-only"});

    useEffect(() => {
        if (loading === false && data) {
            setMenuItems(data.itemInventory);
            // @ts-ignore
            setAccordionsOpenClose([...Array(data.itemInventory.length).keys()].map((_) => { return true; }));
        }
    }, [loading, data])

    const itemClickedForOrder = (item: Item) => {
        //console.log('-->', itemContext.state.orderedItems);
        itemContext.dispatch(
            {
                type: 'ADD_ORDERED_ITEM',
                payload: {
                    orderedItemID: ((itemContext.state.orderedItems === undefined || itemContext.state.orderedItems.length === 0) ? 1 : itemContext.state.orderedItems.length + 1),
                    item: item,
                    specialInstructions: ''
                }
            }
        );
    }

    const handleChange = (accordionIndex: number) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
        setAccordionsOpenClose(accordionsOpenClose.map((item, idx) => idx === accordionIndex ? !item : item));
    };

    return (
        <div className="pt-4 px-2 bg-lightgray">
            {loading && <p className="min-h-screen">Loading...</p>}
            {error && <p>Error...</p>}
            {
                menuItems.map((menuItem: ItemInventory, idx: number) =>
                    menuItem.items.length > 0 &&
                    <div className="w-full m-auto md:w-11/12" key={idx}>
                        <Accordion variant="outlined" expanded={accordionsOpenClose[idx]} onChange={handleChange(idx)} style={{backgroundColor:'white !important'}}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <p className="text-xl uppercase font-bold">{menuItem.itemType}s</p>
                            </AccordionSummary>
                            <Divider />
                            <AccordionDetails>
                                <div className="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2 lg:py-6">
                                    {
                                        menuItem.items.map((menuItemDetails: Item) =>
                                            <div key = {menuItemDetails.itemID}
                                                className="relative shadow-xl bg-gray-50 text-darkteal rounded-md p-6 w-full overflow-hidden" >
                                                    <div className="absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-gray-200 z-10"></div>
                                                    <div className="absolute -right-0 -bottom-28 h-56 w-56 rounded-full bg-gray-100"></div>
                                                    <div className="grid gid-cols-1 gap-4 md:grid-cols-3">
                                                        <img src={menuItemDetails.image} alt={menuItemDetails.name} className="rounded-lg"/>
                                                        <div className="md:col-span-2 z-50">
                                                            <p className="text-lg font-semibold mb-2">{menuItemDetails.name}</p>
                                                            <p className="text-justify text-sm mb-2">{menuItemDetails.description}</p>
                                                            <p className="text-sm"><strong>Price:</strong> ${menuItemDetails.price}</p>
                                                            <button
                                                                className="my-4 px-4 py-1 text-sm rounded-full bg-tomato text-lightgray transform transition duration-500 hover:scale-110"
                                                                onClick={() => itemClickedForOrder(menuItemDetails)}>
                                                                Add to cart
                                                            </button>
                                                        </div>
                                                    </div>
                                            </div>
                                        ) 
                                    }
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <br />
                    </div>)
            }
        </div>
    );
}
