export async function createSubCategory(req: Request, res: Response) {
  try {
    const validatedData = subCategorySchema.parse(req.body);
    const newSubCategory = await SubCategory.create(validatedData);
    return res.status(201).json(newSubCategory);
  } catch (error) {
    return res.status(400).json({ error: error.errors });
  }
}
