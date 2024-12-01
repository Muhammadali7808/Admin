import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../layout/main-layout";
import { SingIn } from "../pages/sing-in/sing-in";
import { Home } from "../pages/home/home";
import { Product } from "../pages/Product/product";
import { BrandList } from "../pages/BrandList/brandlist";
import { SubCategoryList } from "../pages/SubCategoryList/subCategoryList";
import { CreateCategory } from "../pages/CategoryList/createCategory";
import { CategoryList } from "../pages/CategoryList/categoryList";

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<SingIn />} />
                <Route path="app" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="category-list" element={<CategoryList />} />
                    <Route path="sub-category-list" element={<SubCategoryList />} />
                    <Route path="brand-list" element={<BrandList />} />
                    <Route path="product" element={<Product />} />
                    <Route path="create-category/:id" element={<CreateCategory />} />
                </Route>
            </Routes>
        </>
    )
}

export default Router