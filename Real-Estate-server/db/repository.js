const { hashPassword } = require('../utils/custom');
const con = require('./db-connect');
const util = require('util');

class Repository {

    constructor(connection) {
        this.con = connection;
        this.query = util.promisify(this.con.query).bind(this.con);
    }

    async isEmailExists(email, user_id = null) {
        let query = 'SELECT COUNT(*) as count FROM users WHERE email = ?';
        let values = [email];

        if (user_id) {
            query += ` AND id != ?`;
            values.push(user_id);
        }

        const results = await this.query(query, values);
        return results[0].count > 0;
    }

    async isContactExists(contact, user_id = null) {

        let query = 'SELECT COUNT(*) as count FROM users WHERE contact = ?';
        let values = [contact];

        if (user_id) {
            query += ` AND id != ?`;
            values.push(user_id);
        }

        const results = await this.query(query, values);
        return results[0].count > 0;
    }

    async login({ email }) {
        const query = 'SELECT id, user_type, is_active, image, password FROM users WHERE email = ? ';
        return await this.query(query, [email]);
    }

    async register({ name, contact, email, address, hashPassword }) {
        const query = 'INSERT INTO users (user_type, name, contact, email, address, password, is_active, created_at) VALUES ("USER", ?, ?, ?, ?, ?, ?, NOW())';
        const values = [name, contact, email, address, hashPassword, true];
        return await this.query(query, values);
    }

    async propertyRegister({ name, type, price, sq_ft, state, area, landmark, address, pincode, map, description, image, status }, userId) {
        const query = `INSERT INTO property(owner_id,name,type,price,sq_ft,state,area,landmark,address,pincode,map,image,description,status,created_at)
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`;
        const values = [userId, name, type, price, sq_ft, state, area, landmark, address, pincode, map, image, description, status];
        return await this.query(query, values);
    }

    async showProperties(owner_id = null, role = null) {
        let query = `
            SELECT u.name AS owner_name, u.image AS owner_image, u.contact AS owner_contact,
                   p.name, p.type, p.sq_ft, p.state, p.pincode, p.image, p.description, p.id, p.price, p.status
            FROM property AS p
            JOIN users AS u ON u.id = p.owner_id
        `;
        let values = [];

        if (role) {
            query += ` WHERE p.status != ?`;
            values.push('Sold');
        } else {
            query += ` WHERE p.status = ?`;
            values.push('Active');
        }


        if (owner_id !== null) {
            query += ' AND p.owner_id != ?';
            values.push(owner_id);
        }

        query += ' ORDER BY p.id DESC';

        return await this.query(query, values);
    }

    async getOwnerProperties(owner_id) {
        const query = 'SELECT * FROM property WHERE owner_id = ? ORDER BY id DESC';
        return await this.query(query, [owner_id]);
    }

    async showPreferredProperty({ id }) {
        const query = `SELECT u.name AS owner_name,u.image AS owner_image,u.contact AS owner_contact,u.id AS owner_id,
                       p.id,p.name,p.type,p.price,p.sq_ft,p.state,p.area,p.landmark,p.address,p.pincode,p.map,p.image,p.description,p.status
                       FROM property AS p
                       JOIN users AS u ON u.id = p.owner_id
                       WHERE  p.id = ?`;
        const values = ['Active', id];
        return await this.query(query, [id]);
    }

    async alreadyBooked(user_id, property_id) {
        const query = 'SELECT COUNT(*) AS `count` FROM `bookings` WHERE `property_id` = ? AND `user_id`= ?';
        const results = await this.query(query, [property_id, user_id]);
        return results[0].count > 0;
    }

    async createBookings({ owner_id, property_id, booking_cost, description }, user_id) {
        const query = 'INSERT INTO bookings(user_id,owner_id,property_id,booking_cost,`description`,`status`,created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())';
        const values = [user_id, owner_id, property_id, booking_cost, description, 'Pending'];
        return await this.query(query, values);
    }

    async alreadyRequested(user_id, property_id, date) {
        const query = 'SELECT COUNT(*) AS count FROM onsite_view WHERE property_id = ? AND user_id = ? AND date = ?';
        const results = await this.query(query, [property_id, user_id, date]);
        return results[0].count > 0;
    }

    async createOnsiteRequest({ owner_id, property_id, date, description }, user_id) {
        const query = 'INSERT INTO onsite_view (user_id, property_id, owner_id, `date`, `description`,`status`, created_at) VALUES(?, ?, ?, ?, ?, ?, NOW())';
        const values = [user_id, property_id, owner_id, date, description, 'Pending'];
        return await this.query(query, values);
    }

    async getBookings(user_id = null, owner_id = null) {
        let query = `SELECT b.id, b.booking_cost, b.description, b.status AS b_status,
                        p.name AS p_name, p.type AS p_type, p.price AS p_price, p.image AS p_image, p.id AS p_id, p.status AS p_status,
                        u.id AS u_id, u.name AS u_name, u.image AS u_image, u.contact AS u_contact,
                        o.id AS o_id, o.name AS o_name, o.image AS o_image, o.contact AS o_contact
                        FROM bookings AS b
                        JOIN property AS p ON p.id = b.property_id
                        JOIN users AS u ON u.id = b.user_id
                        JOIN users AS o ON o.id = b.owner_id`
        let values = [];

        if (user_id) {
            query += ` WHERE b.user_id = ? `;
            values.push(user_id);
        }
        if (owner_id) {
            query += ` WHERE b.owner_id = ? `;
            values.push(owner_id);
        }
        query += `ORDER BY b.id DESC`;
        return await this.query(query, values);
    }

    async updateBookingsStatus({ property_id, booking_id, status }) {

        const query = 'UPDATE bookings SET `status` = ?, updated_at = NOW() WHERE id = ?';
        await this.query(query, [status, booking_id]);

        const property = 'UPDATE `property` SET `status` = ? , `updated_at` = NOW() WHERE id = ?';
        await this.query(property, ["Sold", property_id]);

        const query2 = 'UPDATE bookings SET `status` = ?, updated_at = NOW() WHERE  property_id = ? AND id != ?';
        return await this.query(query2, ['Rejected', property_id, booking_id]);
    }

    async cancelBooking({ id }) {
        const query = 'DELETE FROM `bookings` WHERE id = ?';
        return await this.query(query, [id]);
    }

    async updatePropertyStatus(id, status) {  
        console.log('Reached Here');
              
        const query = 'UPDATE `property` SET `status` = ? , `updated_at` = NOW() WHERE id = ?';
        return await this.query(query, [status, id]);
    }

    async getOnsiteRequests(user_id = null, owner_id = null) {
        let query = `SELECT b.id, b.date, b.description, b.status AS b_status,
                        p.name AS p_name, p.type AS p_type, p.price AS p_price, p.image AS p_image, p.id AS p_id,
                        u.id AS u_id, u.name AS u_name, u.image AS u_image, u.contact AS u_contact,
                        o.id AS o_id, o.name AS o_name, o.image AS o_image, o.contact AS o_contact
                        FROM onsite_view AS b
                        JOIN property AS p ON p.id = b.property_id
                        JOIN users AS u ON u.id = b.user_id
                        JOIN users AS o ON o.id = b.owner_id`
        let values = [];

        if (user_id) {
            query += ` WHERE b.user_id = ? `;
            values.push(user_id);
        }
        if (owner_id) {
            query += ` WHERE b.owner_id = ? `;
            values.push(owner_id);
        }
        query += `ORDER BY b.id DESC`;
        return await this.query(query, values);
    }

    async cancelRequest({ id }) {
        const query = 'DELETE FROM `onsite_view` WHERE id = ?';
        return await this.query(query, [id]);
    }

    async updateRequestStatus({ id, status }) {
        const query = 'UPDATE onsite_view SET `status` = ?, updated_at = NOW() WHERE id = ?';
        await this.query(query, [status, id]);
    }

    async updateProperty({ id, name, type, price, sq_ft, state, area, landmark, address, pincode, map, description, image, status }) {
        let query = `UPDATE property SET name = ?, type = ?, price = ?, sq_ft = ?, state = ?, area = ?, landmark = ?, address = ?, pincode = ?, map = ?, description = ?, status = ?, updated_at = NOW()`;
        let values = [name, type, price, sq_ft, state, area, landmark, address, pincode, map, description, status];

        if (image) {
            query += `, image = ?`;
            values.push(image);
        }

        query += ` WHERE id = ?`;
        values.push(id);

        return await this.query(query, values);
    }

    async getUser(id) {
        const query = 'SELECT * FROM users WHERE id = ?';
        return await this.query(query, [id]);
    }

    async updateProfile(req) {

        let query = 'UPDATE users SET contact = ?, address = ?, email = ?';
        let values = [req.body.contact, req.body.address, req.body.email];

        if (req.body.password) {
            const hashedPassword = await hashPassword(req.body.password);
            query += ', password = ?';
            values.push(hashedPassword);
        }

        if (req.file) {
            query += ', image = ?';
            values.push(req.file.path);
        }

        query += ', updated_at = NOW() WHERE id = ?';
        values.push(req.userId);


        return await this.query(query, values);
    }

    async getAllUsers() {
        const query = 'SELECT id,name, contact, email, address, is_active, image FROM `users` WHERE user_type != ?';
        return await this.query(query, ['ADMIN']);
    }

    async updateUserStatus({ status, id }) {
        const query = 'UPDATE users SET is_active = ?, updated_at = NOW() WHERE id = ?';
        return await this.query(query, [status, id]);
    }

    async updatePropertyStatus({ status, id }) {
        const query = 'UPDATE property SET `status` = ?, updated_at = NOW() WHERE id = ?';
        return await this.query(query, [status, id]);
    }

    async createPropertyReview({ property_id, review_message }, userId) {
        const query = 'INSERT INTO property_review (user_id, property_id, review_message, created_at) VALUES (?, ?, ?, NOW())';
        return await this.query(query, [userId, property_id, review_message]);
    }

    async getPropertyReview({ id }) {
        const query = `SELECT pr.review_message ,u.name, u.image, u.contact
                        FROM  property_review AS pr
                        JOIN users AS u ON u.id = pr.user_id
                        WHERE property_id = ?
                        ORDER BY pr.id DESC
                        `
        return await this.query(query, [id]);
    }
}
const repository = new Repository(con);
module.exports = repository;