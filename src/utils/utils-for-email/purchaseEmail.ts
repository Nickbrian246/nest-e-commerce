import { Orders, Product } from 'src/my-orders/dto-for-my-orders';
import { AddressDto } from 'src/delivery-addresses/dto-for-delivery-addresses';

export class PurchaseEmail {
  generatePurchaseSummaryEmailHTML(
    groupOfProducts: Product[],
    address: AddressDto,
    orders: Orders[],
  ) {
    const test = groupOfProducts.map((product) => {
      const price = product.hasOffer ? product.priceWithOffer : product.price;
      return `
        <tr>
          <td><img class="product-image" src="${product.image}" alt="${
            product.title
          }"></td>
          <td>${product.title}</td>
          <td>${price.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN',
          })}</td>
          <td>${product.quantity}</td>
          <td>${product.description}</td>
          <td>${product.subTotal}</td>
        </tr>
      `;
    });

    const tableHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th, td {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
        }
        th {
          background-color: #f2f2f2;
        }
        .product-image {
          max-width: 100px; 
          height: 100px; 
          display: block; 
          margin: 0 auto; 
        }
        .title {
          font-size: 24px !important;
          font-weight: bold !important;
          margin-bottom: 10px !important;
          text-align: center !important;
        }
        .message {
          font-size: 16px;
          margin-bottom: 20px;
        }
        .address-info {
          border: 1px solid #dddddd;
          padding: 15px;
          margin-top: 20px;
          background-color: #f9f9f9;
        }
        .address-info p {
          margin: 8px 0;
          font-size: 15px;
          font-weight: 400;
        }

      </style>
    </head>
    <body>
      <div>
        <p class="title">¡Gracias por su compra!</p>
        <p class="message">A continuación se muestra el resumen de su compra y la información de envío:</p>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Descripción</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${test.join('')}
          </tbody>
        </table>

        <table>
        <thead>
          <tr>
            <th>Total de envío</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <td>${orders[0].totalShippingPrice}</td>
          <td>${orders[0].totalCost}</td>
        </tr>
        </tbody>
      </table>
      
        <div class="address-info">
          <p class="title">Información de envío</p>
          <p>Nombre: ${address.name}</p>
          <p>Apellidos: ${address.lastName}</p>
          <p>Número de teléfono: ${address.phoneNumber}</p>
          <p>Ciudad: ${address.city}</p>
          <p>Colonia: ${address.colony}</p>
          <p>Email: ${address.email}</p>
          <p>Estado: ${address.state}</p>
          <p>Referencia: ${address.neighborReference}</p>
        </div>
      
      </div>
    </body>
    </html>
  `;
    return tableHtml;
  }
}
