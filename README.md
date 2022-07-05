/**

app.controller.ts	带有单个路由的基本控制器。
app.controller.spec.ts	针对控制器的单元测试。
app.module.ts	T应用程序的根模块（root module）。
app.service.ts	具有单一方法的基本服务（service）。 method.
main.ts	应用程序的入口文件，它使用核心函数 NestFactory 来创建 Nest 应用程序的实例。

TypeORM  支持储存库设计模式，这意味着我们创建的每个实体都有自己的储存库 
  Repository : 作为对我们数据源的抽象，并公开了各种有用的方法来与储存在我们数据库中的记录进行交互 
    @InjectRepository(Coffee)   在 Service 中自动注入 Entity
  preload:    此方法根据传入的对象创建一个新实体(先查看数据库中是否存在实体，如果存在就更新，不存在就返回undefind)
  @OntToOne()    :  定义数据库关联一对一的关系
  @OntToMany()   :  定义数据库关联一对多的关系
  @ManyToOne()   :  定义数据库关联一对多的关系
  @ManyToMany()  :  定义数据库关联多对多的关系
  @JoinTable()   :  连接关系的中间表
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, { cascade: true })        cascade -- 级联插入  插入和更新启用级联 

DTO : 数据传输对象，用于封装数据并将其从一个应用程序发送到另一个应用程序，DTO帮助我们定义系统内的接口或者输入和输出
      让我们为进入API请求主体的数据的形状创建一个定义。
      但我们不知道是谁在调用这些请求，我们如何确保传入的数据具有正确的形状。或者如果他缺少必填字段

Entity : 表示 TypeScript 类和数据库表之间的关系

ValidationPipe : 用来验证字段正确性。需要 npm i class-validator class-transformer
  PartialType  标记所有属性都是可选的 
  @IsOptional()  动态添加单个附加验证规则到每个字段
  whitelist: true               设置白名单
  forbidNonWhitelisted: true    任何非白名单属性都会报错
  transform: true               将传入的数据格式转换为我们定义的类型(get请求id是number但是经过网络传输会自动转为string)   会对性能产生一点点影响

controller 
  控制层，用来和前端交互
  nest generate controller name  / nest g co  生成一个控制器      不生成测试文件：nest g co --no-spec
  nest generate service 或者 nest g s         输入文件名创建服务，cli会创建对应服务和测试文件
  nest g module     生成一个module,需要删除app.module里面的引用，不然会实例化两次
  nest g class coffees/dto/create-coffee.dto --no-spec

  @Entity   装饰实体的类(和数据库同步的类)
  @PrimaryGeneratedColumn()       数据库主键id
  @Column()             数据库一般的列
  @Column('json', { nullable: true })         表示这个列为json对象，可以为null
  @InjectRepository(Coffee)                   注入，将实体类注入
  @nestjs/mapped-types    常见类型转换的包    
    

  docker-compose up -d        分离模式运行docker    命令启动和手动启动效果一样
  npm i @nestjs/typeorm typeorm pg    安装typeorm的数据库
  试运行：--dry-run
  1.1 controller方法
    @controller('xxx')

    @Get()    // 表明这个方法是get请求

    @Get(':id') // 占位符
    aaa(@Param() params){ return 'xxx' }  或者 aaa(@Param('id') id:string){}

    @Post()   //  表明这个方法是post请求
    aaa(@Body() Body){}  或者 aaa(@Body('id') body){}

    @HttpCode()   //  返回自定义httpCode
      @Post()
      @HttpCode(HttpStatus.GONE)
      aaa(@Body() Body){}

    @Res()    //  返回自定义httpCode
      @Get()
      aaa(@res() response){
        response.status(200).send('xxx)
      }

    @Patch(:id)
    aaa(@Param('id) id:string, @Body() body){}

    @Delete('id)
    aaa(@Param('id') id:string){}

    @Query()    //  条件分页
      @Get()
      aaa(@Query() paginationQuery){
        const {limit,offset} = paginationQuery
      }

    HttpException   抛出异常
    hrow new HttpException('抛出异常',HttpStatus.NOT_FOUND)
    NotFoundException('找不到数据')

    @Module({})   模块装饰器，需要一个单一的对象，其属性描述了模块和所有的他的上下文




























 */