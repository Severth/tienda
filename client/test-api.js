import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
    rejectUnauthorized: false
});

const api = axios.create({
    baseURL: 'https://localhost:7088/api',
    httpsAgent: agent
});

async function test() {
    try {
        console.log("Testing API...");

        // 1. Create
        console.log("Creating Product...");
        const createRes = await api.post('/products', {
            name: "Test Node Product",
            description: "Created via Node Script",
            price: 50.50,
            stock: 100
        });
        console.log("Created:", createRes.data);
        const id = createRes.data.id;

        // 2. List
        console.log("Listing Products...");
        const listRes = await api.get('/products');
        console.log("Count:", listRes.data.length);
        const exists = listRes.data.some(p => p.id === id);
        console.log("Product exists in list:", exists);

        // 3. Delete
        console.log("Deleting Product...");
        await api.delete(`/products/${id}`);
        console.log("Deleted.");

        // 4. Verify Delete
        console.log("Verifying Deletion...");
        const listRes2 = await api.get('/products');
        const exists2 = listRes2.data.some(p => p.id === id);
        console.log("Product still exists:", exists2);

        console.log("Test Completed Successfully!");
    } catch (error) {
        console.error("Test Failed:", error.message);
        if (error.response) {
            console.error("Data:", error.response.data);
            console.error("Status:", error.response.status);
        }
    }
}

test();
