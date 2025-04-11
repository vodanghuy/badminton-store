let menuSchema = require('../schemas/menu')

module.exports = {
    // Get all menu items
    getAllMenu: async function () {
        let menus = await menuSchema.find();
        let parents = menus.filter(menu => menu.parent === null);
        let result = [];
        for (const parent of parents) {
            let objectParent = {};
            objectParent.text = parent.text;
            objectParent.url = parent.url;
            let childrenRes = await menuSchema.find({ parent: parent._id }).select('text url')
            let children = []
            for (const child of childrenRes) {
               children.push({
                    text: child.text,
                    url: child.url
                })
            }
            objectParent.children = children;
            result.push(objectParent)
        }
        return result;
    },
    // Get menu item by id
    getById: async function (id) {
        let menu = await menuSchema.findById(id).populate({ path: 'parent', select: 'text' });
        if (menu) {
            return menu;
        } else {
            throw new Error('Không tìm thấy danh mục');
        }
    },
    // Create menu item
    createMenu: async function (body) {
        let newMenu = new menuSchema({
            text: body.text,
            url: body.url,
        });
        if(body.parent) {
            let parent = await menuSchema.findOne({
                text: body.parent
            })
            newMenu.parent = parent._id
        }
        return await newMenu.save();
    },
    // Update menu item
    updateMenu: async function(id, body) {
        let updatedMenu = await menuSchema.findById(id);
        if (body.text) {
            updatedMenu.text = body.text;
        }
        if (body.parent) {
            updatedMenu.parent = body.parent;
        }
        if (body.order) {
            updatedMenu.order = body.order;
        }
        await updatedMenu.save();
        return updatedMenu;
    },
    // Delete menu item
    deleteMenu: async function (id) {
        let deletedMenu = await menuSchema.findById(id);
        deletedMenu.isDeleted = true;
        await deletedMenu.save();
        return deletedMenu;
    }
}