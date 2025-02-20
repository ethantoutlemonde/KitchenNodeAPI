import { Menu } from '../../models';

class MenuService {
    async createMenu(data) {
        const menu = new Menu(data);
        return await menu.save();
    }

    async getMenus() {
        return await Menu.find().populate('idProduits');
    }

    async getMenuById(id) {
        return await Menu.findById(id).populate('idProduits');
    }

    async updateMenu(id, data) {
        return await Menu.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteMenu(id) {
        return await Menu.findByIdAndDelete(id);
    }
}

export default new MenuService();
