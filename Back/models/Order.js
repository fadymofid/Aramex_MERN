const mongoose = require('mongoose');
const mongoose_seq = require('mongoose-sequence')(mongoose);

const OrderSchema = mongoose.Schema({
    OrderId: {
      type: Number,
      unique: true,
    },
    userId: {
        type: Number,
        ref: 'User', // Reference the custom userId from User model
        required: true,
      },

      courieruserId: {
        type: Number,
        ref: 'User', // Reference the custom userId from User model
        required: false,
        default: null,

      },
    pickupLocation: {
        type: String,
        required: true,
      },
    dropoffLocation: {
        type: String,
        required: true,
      },
    packageDetails: {
        type: String,
        required: true,
      },
    deliveryTime: {
        type: Date,
        required: true,
      },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'in_transit', 'delivered', 'canceled'],
        default: 'pending',
      },
    });


    OrderSchema.plugin(mongoose_seq, { inc_field: 'OrderId', start_seq: 1 });

    const Order = mongoose.model('Order', OrderSchema);
    module.exports = Order;

  
