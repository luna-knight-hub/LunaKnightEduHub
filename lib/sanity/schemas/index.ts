import { type SchemaTypeDefinition } from 'sanity';

import { educationalAppSchema } from './educationalApp';
import { postSchema } from './post';

/**
 * Tất cả Sanity schemas tập trung tại đây.
 * Thêm schema mới? Import rồi thêm vào mảng bên dưới.
 */
export const schemaTypes: SchemaTypeDefinition[] = [postSchema, educationalAppSchema];
