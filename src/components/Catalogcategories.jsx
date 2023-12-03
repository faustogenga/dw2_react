import React from 'react'
import '../CSS/Catalogcategories.css';
import { CataloginputCategory } from './CataloginputCategory';

export const Catalogcategories = ({ handleClickCategory, categoryClicked }) => {
    return (
        <>
            <div>
                <h2 className="sidebar-title">Category</h2>
                <div>
                    <label className="sidebar-label-container">
                        <input
                            checked={categoryClicked === 'All'}
                            onChange={handleClickCategory}
                            type="radio"
                            name="All" />
                        <span className="checkmark"></span>All
                    </label>
                    <CataloginputCategory
                        categoryClicked={categoryClicked}
                        handleClickCategory={handleClickCategory}
                        title="Soccer Cleats"
                        name="Soccer Cleats"
                    />

                    <CataloginputCategory
                        categoryClicked={categoryClicked}
                        handleClickCategory={handleClickCategory}
                        title="Camisetas"
                        name="Camisetas"
                    />

                    <CataloginputCategory
                        categoryClicked={categoryClicked}
                        handleClickCategory={handleClickCategory}
                        title="Balones de Futbol"
                        name="Balones"
                    />

                </div>
            </div>

        </>
    )
}

export default Catalogcategories;