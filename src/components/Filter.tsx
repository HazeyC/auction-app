
const Filter = () => {
    return (
        <div className="filter">
            <h3 className="filter__title">Filter Listings</h3>
            <div className="filter__field">
                <label htmlFor="category" className="filter__label">
                    Category
                </label>
                <select id="category" className="filter__select">
                    <option value="">Equipment Manufacturer</option>
                    <option value="johndeere">John Deere</option>
                    <option value="macdon">MacDon</option>
                    <option value="kubota">Kubota</option>
                </select>
            </div>
        </div>
    );
};

export default Filter;