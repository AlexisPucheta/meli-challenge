import axios from "axios";

const BaseUrl = "https://api.mercadolibre.com/sites/MLA/search?q=";
const ML_SELLERS_BY_ID = "https://api.mercadolibre.com/users";
const ML_ITEMS_BY_CATEGORY = "https://api.mercadolibre.com/categories";
const ML_CURRENCIES_BY_ID = "https://api.mercadolibre.com/currencies";

const ML_ITEM_BY_ID = "https://api.mercadolibre.com/items/";
const ML_ITEM_DESCRIPTION_BY_ID = "https://api.mercadolibre.com/items/";

const getCategorieById = (id) => axios.get(`${ML_ITEMS_BY_CATEGORY}/${id}`);
const getCurrencyById = (id) => axios.get(`${ML_CURRENCIES_BY_ID}/${id}`);
const getSellerById = (id) => axios.get(`${ML_SELLERS_BY_ID}/${id}`);
const getDescriptionById = (id) =>
  axios.get(`${ML_ITEM_DESCRIPTION_BY_ID}/${id}/description`);
// const getItemById = (id) => axios.get(`${ML_CURRENCIES_BY_ID}/${id}`)

const getAllItems = async (req, res) => {
  try {
    if (req.query?.q) {
      const url = BaseUrl + req.query.q;
      const { data: apiResponse } = await axios.get(BaseUrl + req.query.q);
      if (apiResponse.results.length) {
        const items = apiResponse.results.slice(0, 4);
        const products = await Promise.all(
          items.map(async (item) => {
            const categories = await getCategorieById(item.category_id);
            const currency = await getCurrencyById(item.currency_id);
            return {
              author: {
                name: item.seller.nickname,
                lastname: item.seller.nickname,
              },
              item: {
                id: item.id,
                title: item.title,
                price: {
                  currency: item.currency_id,
                  amount: item.price,
                  decimals: currency.data.decimal_places,
                },
                picture: item.thumbnail,
                condition: item.condition,
                free_shipping: item.shipping.free_shipping,
                location: item.address.state_name || "",
              },
              categories: categories.data.path_from_root.map(
                (category) => category.name
              ),
            };
          })
        );
        res.send(products);
      } else res.sendStatus(404);
    } else res.sendStatus(400);
  } catch (e) {
    res.send(e);
  }
};

const getItemById = async (req, res) => {
  try {
    console.log("params", req.params.id);
    if (req.params?.id) {
      const itemResponse = await axios.get(`${ML_ITEM_BY_ID}/${req.params.id}`);
      if (itemResponse?.data) {
        console.log("item", itemResponse.data)
        const sellerInfo = await getSellerById(itemResponse.data.seller_id);
        console.log("seller", sellerInfo.data)
        let author;
        if (sellerInfo) {
          author = {
            name: sellerInfo.data.nickname,
            lastname: sellerInfo.data.nickname,
          };
        }
        const descriptionInfo = await getDescriptionById(itemResponse.data.id);
        console.log("description", descriptionInfo.data.plain_text)
        let description;
        if (descriptionInfo.data) {
          description = descriptionInfo.data.plain_text;
        }
        const currency = await getCurrencyById(itemResponse.data.currency_id);
        console.log("currency", currency)

        const product = {
            author: author,
          item: {
            id: itemResponse.data.id,
            title: itemResponse.data.title,
            price: {
              currency: itemResponse.data.currency_id,
              amount: itemResponse.data.price,
              decimals: currency.data.decimal_places,
            },
            picture: itemResponse.data.thumbnail,
            condition: itemResponse.data.condition,
            free_shipping: itemResponse.data.shipping.free_shipping,
            sold_quantity: itemResponse.data.sold_quantity
          },
        };
        console.log("product",product)
        res.send(product);
      } else res.sendStatus(404);
    } else res.sendStatus(400);
  } catch (e) {
    res.send(e);
  }
};

export { getAllItems, getItemById };
