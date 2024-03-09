import {useState} from "react";

function ProductCategoryRow({ category }) {
    return (
        <tr>
            <th colSpan='2'>
                {category}
            </th>
        </tr>
    )
}

function ProductRow( {product} ){
    const name = product.stocked ? product.name :
        <span style={{color: 'red'}}>{product.name}</span>
    return(
        <tr>
            <td>{name}</td>
            <td>{product.price}</td>
        </tr>
    )
}

function ProductTable({ products, filterText, inStockOnline }){
    const rows = [];
    let lastCategory = null;

    products.forEach((product) => {
        if(
            product.name.toLowerCase().indexOf(
                filterText.toLowerCase()
            ) === -1
        ){
            return;
        }
        if(inStockOnline && !product.stocked){
            return;
        }
        if(product.category !== lastCategory){
            rows.push(
                <ProductCategoryRow
                    category={product.category}
                    key={product.category}
                />
            )
        }
        rows.push(
            <ProductRow
                product={product}
                key={product.name}
            />
        );
        lastCategory = product.category;
    })
    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Price</th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>
    )
}

function SearchBar( {filterText, inStockOnline, onFilterTextChange, onInStickOnline}) {
    return (
        <form action="">
            <input type="text"
                   value={filterText}
                   onChange={(e) => onFilterTextChange(e.target.value)}
                   placeholder='Search'/>
            <label>
                <input
                    checked={inStockOnline}
                    onChange={(e) => onInStickOnline(e.target.checked)}
                    type="checkbox"/>
                {' '}
                Only show products in stock
            </label>
        </form>
    )
}

function FilterProductTable({products}) {
    const [filterText, setFilterText] = useState('');
    const [inStockOnline, setInStickOnline] = useState(false);
    return (
        <div>
            <SearchBar
                filterText={filterText}
                inStockOnline={inStockOnline}
                onFilterTextChange={setFilterText}
                onInStickOnline={setInStickOnline}
            />
            <ProductTable
                products={products}
                filterText={filterText}
                inStockOnline={inStockOnline}
            />
        </div>
    )
}


const PRODUCTS = [
    {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
    {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
    {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
    {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
    {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
    {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
    return <FilterProductTable products={PRODUCTS}/>
}