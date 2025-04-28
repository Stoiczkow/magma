import { CategoryProvider, Category } from "typescript-logging-category-style";

const provider = CategoryProvider.createProvider("ExampleProvider");

const getLogger = (name: string): Category => {
    return provider.getCategory(name);
}

export default getLogger('default')