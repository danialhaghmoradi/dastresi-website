import countdown from "./countdown";
import header from "./header/header";
import heroSlider from "./hero-slider/hero-slider";
import swiperConfig from "./hero-slider/swiperConfig";
import menu from "./menu/Menu";
import {
  productDiscount_col_1,
  productDiscount_col_2,
} from "./products_discounts/products_discounts";
import sliderCategories from "./slidercategories/sliderCategories";
import { swiperConfigSliderCategories } from "./slidercategories/swiperconfig-slidercategories";
heroSlider();
header();
menu();
swiperConfig();
countdown();
productDiscount_col_1();
productDiscount_col_2();
swiperConfigSliderCategories();
sliderCategories();
