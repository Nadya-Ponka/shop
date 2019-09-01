TASK 6

1.  Реализован бекэнд для проекта, используя, json-server (port 3100).

2.  Созданы сервисы для работы с HttpClient: ProductsPromiseService и ProductsObservableService. 
    Из ProductsPromiseService используются методы getProducts() и getProduct() в ProductListComponent. 
    А из ProductsObservableService используются createProduct() и updateProduct() для работы с ProductFormComponent.
    
3.  Реализован TimingInterceptor, который в консоль выводит длительность запросов со строкой запроса, 
    включающей в себя 'productsList/2'. Например, посмотреть reviews для продукта с id = 2 или редактировать этот продукт. 

4.  Реализован сервис core/AppSettings, который должен загружать настройки приложения из локал сторедж используя  
    сервис LocalStorageService, разработанный ранее. Если в локал сторедж ничего нет, то загружать из файла assets/app-settings.json и при удачной загрузке записывать эти данные в локал сторедж, используя сервис LocalStorageService. При неудачной попытке делать две попытки.
    Если загрузить все-таки не удалось, то устанавливать значения настроек поумолчанию defaultAppSettings из сервиса AppSettings.

5.  Применен Linter.

6. :)