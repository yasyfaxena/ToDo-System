const { z } = require("zod");

const todoCreateSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(255),
  }),
  params: z.object({}),
  query: z.object({}),
});

const todoUpdateSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(255).optional(),
    completed: z.boolean().optional(),
  }),
  params: z.object({
    id: z.string().min(1),
  }),
  query: z.object({}),
});

const todoIdSchema = z.object({
  body: z.object({}),
  params: z.object({
    id: z.string().min(1),
  }),
  query: z.object({}),
});

module.exports = {
  todoCreateSchema,
  todoUpdateSchema,
  todoIdSchema,
};
