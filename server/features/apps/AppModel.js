import mongoose from 'mongoose';
import slug from 'slugify';

const AppSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
        required: true,
    },
    slug: {
        type: String,
    },
    userId: {
        type: String,
        required: true,
    },
    apiKey: {
        type: String,
        maxlength: 200,
        required: true,
    },
    description: {
        type: String,
        maxlength: 500,
        default: '',
    },
    time: {
        type: Number,
        required: true,
        default: 10000,
    },
    limit: {
        type: Number,
        required: true,
        default: 10,
    },
    blockList: [],
    allowList: [],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

AppSchema.pre('save', function (next) {
    this.slug = slug(this.name);
    next();
});

export default mongoose.model('apps', AppSchema);
