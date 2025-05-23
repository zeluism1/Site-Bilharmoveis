
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model ProductModel
 * 
 */
export type ProductModel = $Result.DefaultSelection<Prisma.$ProductModelPayload>
/**
 * Model ProductVariant
 * 
 */
export type ProductVariant = $Result.DefaultSelection<Prisma.$ProductVariantPayload>
/**
 * Model Project
 * 
 */
export type Project = $Result.DefaultSelection<Prisma.$ProjectPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more ProductModels
 * const productModels = await prisma.productModel.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more ProductModels
   * const productModels = await prisma.productModel.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.productModel`: Exposes CRUD operations for the **ProductModel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductModels
    * const productModels = await prisma.productModel.findMany()
    * ```
    */
  get productModel(): Prisma.ProductModelDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.productVariant`: Exposes CRUD operations for the **ProductVariant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProductVariants
    * const productVariants = await prisma.productVariant.findMany()
    * ```
    */
  get productVariant(): Prisma.ProductVariantDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    ProductModel: 'ProductModel',
    ProductVariant: 'ProductVariant',
    Project: 'Project'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "productModel" | "productVariant" | "project"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      ProductModel: {
        payload: Prisma.$ProductModelPayload<ExtArgs>
        fields: Prisma.ProductModelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductModelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductModelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductModelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductModelPayload>
          }
          findFirst: {
            args: Prisma.ProductModelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductModelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductModelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductModelPayload>
          }
          findMany: {
            args: Prisma.ProductModelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductModelPayload>[]
          }
          create: {
            args: Prisma.ProductModelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductModelPayload>
          }
          createMany: {
            args: Prisma.ProductModelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductModelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductModelPayload>[]
          }
          delete: {
            args: Prisma.ProductModelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductModelPayload>
          }
          update: {
            args: Prisma.ProductModelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductModelPayload>
          }
          deleteMany: {
            args: Prisma.ProductModelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductModelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductModelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductModelPayload>[]
          }
          upsert: {
            args: Prisma.ProductModelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductModelPayload>
          }
          aggregate: {
            args: Prisma.ProductModelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductModel>
          }
          groupBy: {
            args: Prisma.ProductModelGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductModelGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductModelCountArgs<ExtArgs>
            result: $Utils.Optional<ProductModelCountAggregateOutputType> | number
          }
        }
      }
      ProductVariant: {
        payload: Prisma.$ProductVariantPayload<ExtArgs>
        fields: Prisma.ProductVariantFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductVariantFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductVariantFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          findFirst: {
            args: Prisma.ProductVariantFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductVariantFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          findMany: {
            args: Prisma.ProductVariantFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>[]
          }
          create: {
            args: Prisma.ProductVariantCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          createMany: {
            args: Prisma.ProductVariantCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductVariantCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>[]
          }
          delete: {
            args: Prisma.ProductVariantDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          update: {
            args: Prisma.ProductVariantUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          deleteMany: {
            args: Prisma.ProductVariantDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductVariantUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductVariantUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>[]
          }
          upsert: {
            args: Prisma.ProductVariantUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductVariantPayload>
          }
          aggregate: {
            args: Prisma.ProductVariantAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProductVariant>
          }
          groupBy: {
            args: Prisma.ProductVariantGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductVariantGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductVariantCountArgs<ExtArgs>
            result: $Utils.Optional<ProductVariantCountAggregateOutputType> | number
          }
        }
      }
      Project: {
        payload: Prisma.$ProjectPayload<ExtArgs>
        fields: Prisma.ProjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findFirst: {
            args: Prisma.ProjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          findMany: {
            args: Prisma.ProjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          create: {
            args: Prisma.ProjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          createMany: {
            args: Prisma.ProjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          delete: {
            args: Prisma.ProjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          update: {
            args: Prisma.ProjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          deleteMany: {
            args: Prisma.ProjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>[]
          }
          upsert: {
            args: Prisma.ProjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProjectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.ProjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProjectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    productModel?: ProductModelOmit
    productVariant?: ProductVariantOmit
    project?: ProjectOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ProductModelCountOutputType
   */

  export type ProductModelCountOutputType = {
    variants: number
  }

  export type ProductModelCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    variants?: boolean | ProductModelCountOutputTypeCountVariantsArgs
  }

  // Custom InputTypes
  /**
   * ProductModelCountOutputType without action
   */
  export type ProductModelCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductModelCountOutputType
     */
    select?: ProductModelCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductModelCountOutputType without action
   */
  export type ProductModelCountOutputTypeCountVariantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductVariantWhereInput
  }


  /**
   * Models
   */

  /**
   * Model ProductModel
   */

  export type AggregateProductModel = {
    _count: ProductModelCountAggregateOutputType | null
    _avg: ProductModelAvgAggregateOutputType | null
    _sum: ProductModelSumAggregateOutputType | null
    _min: ProductModelMinAggregateOutputType | null
    _max: ProductModelMaxAggregateOutputType | null
  }

  export type ProductModelAvgAggregateOutputType = {
    dimensionsWidth: number | null
    dimensionsHeight: number | null
    dimensionsDepth: number | null
    weight: number | null
  }

  export type ProductModelSumAggregateOutputType = {
    dimensionsWidth: number | null
    dimensionsHeight: number | null
    dimensionsDepth: number | null
    weight: number | null
  }

  export type ProductModelMinAggregateOutputType = {
    id: string | null
    modelName: string | null
    displayNamePT: string | null
    displayNameEN: string | null
    displayNameES: string | null
    category: string | null
    subcategory: string | null
    productType: string | null
    baseDescriptionPT: string | null
    baseDescriptionEN: string | null
    baseDescriptionES: string | null
    baseFeatures: string | null
    baseMaterials: string | null
    dimensionsWidth: number | null
    dimensionsHeight: number | null
    dimensionsDepth: number | null
    dimensionsUnit: string | null
    weight: number | null
    defaultVariantId: string | null
    relatedProductModelIds: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductModelMaxAggregateOutputType = {
    id: string | null
    modelName: string | null
    displayNamePT: string | null
    displayNameEN: string | null
    displayNameES: string | null
    category: string | null
    subcategory: string | null
    productType: string | null
    baseDescriptionPT: string | null
    baseDescriptionEN: string | null
    baseDescriptionES: string | null
    baseFeatures: string | null
    baseMaterials: string | null
    dimensionsWidth: number | null
    dimensionsHeight: number | null
    dimensionsDepth: number | null
    dimensionsUnit: string | null
    weight: number | null
    defaultVariantId: string | null
    relatedProductModelIds: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductModelCountAggregateOutputType = {
    id: number
    modelName: number
    displayNamePT: number
    displayNameEN: number
    displayNameES: number
    category: number
    subcategory: number
    productType: number
    baseDescriptionPT: number
    baseDescriptionEN: number
    baseDescriptionES: number
    baseFeatures: number
    baseMaterials: number
    dimensionsWidth: number
    dimensionsHeight: number
    dimensionsDepth: number
    dimensionsUnit: number
    weight: number
    defaultVariantId: number
    relatedProductModelIds: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductModelAvgAggregateInputType = {
    dimensionsWidth?: true
    dimensionsHeight?: true
    dimensionsDepth?: true
    weight?: true
  }

  export type ProductModelSumAggregateInputType = {
    dimensionsWidth?: true
    dimensionsHeight?: true
    dimensionsDepth?: true
    weight?: true
  }

  export type ProductModelMinAggregateInputType = {
    id?: true
    modelName?: true
    displayNamePT?: true
    displayNameEN?: true
    displayNameES?: true
    category?: true
    subcategory?: true
    productType?: true
    baseDescriptionPT?: true
    baseDescriptionEN?: true
    baseDescriptionES?: true
    baseFeatures?: true
    baseMaterials?: true
    dimensionsWidth?: true
    dimensionsHeight?: true
    dimensionsDepth?: true
    dimensionsUnit?: true
    weight?: true
    defaultVariantId?: true
    relatedProductModelIds?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductModelMaxAggregateInputType = {
    id?: true
    modelName?: true
    displayNamePT?: true
    displayNameEN?: true
    displayNameES?: true
    category?: true
    subcategory?: true
    productType?: true
    baseDescriptionPT?: true
    baseDescriptionEN?: true
    baseDescriptionES?: true
    baseFeatures?: true
    baseMaterials?: true
    dimensionsWidth?: true
    dimensionsHeight?: true
    dimensionsDepth?: true
    dimensionsUnit?: true
    weight?: true
    defaultVariantId?: true
    relatedProductModelIds?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductModelCountAggregateInputType = {
    id?: true
    modelName?: true
    displayNamePT?: true
    displayNameEN?: true
    displayNameES?: true
    category?: true
    subcategory?: true
    productType?: true
    baseDescriptionPT?: true
    baseDescriptionEN?: true
    baseDescriptionES?: true
    baseFeatures?: true
    baseMaterials?: true
    dimensionsWidth?: true
    dimensionsHeight?: true
    dimensionsDepth?: true
    dimensionsUnit?: true
    weight?: true
    defaultVariantId?: true
    relatedProductModelIds?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductModelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductModel to aggregate.
     */
    where?: ProductModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductModels to fetch.
     */
    orderBy?: ProductModelOrderByWithRelationInput | ProductModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductModels
    **/
    _count?: true | ProductModelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductModelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductModelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductModelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductModelMaxAggregateInputType
  }

  export type GetProductModelAggregateType<T extends ProductModelAggregateArgs> = {
        [P in keyof T & keyof AggregateProductModel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductModel[P]>
      : GetScalarType<T[P], AggregateProductModel[P]>
  }




  export type ProductModelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductModelWhereInput
    orderBy?: ProductModelOrderByWithAggregationInput | ProductModelOrderByWithAggregationInput[]
    by: ProductModelScalarFieldEnum[] | ProductModelScalarFieldEnum
    having?: ProductModelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductModelCountAggregateInputType | true
    _avg?: ProductModelAvgAggregateInputType
    _sum?: ProductModelSumAggregateInputType
    _min?: ProductModelMinAggregateInputType
    _max?: ProductModelMaxAggregateInputType
  }

  export type ProductModelGroupByOutputType = {
    id: string
    modelName: string
    displayNamePT: string
    displayNameEN: string
    displayNameES: string
    category: string
    subcategory: string
    productType: string
    baseDescriptionPT: string
    baseDescriptionEN: string
    baseDescriptionES: string
    baseFeatures: string
    baseMaterials: string
    dimensionsWidth: number
    dimensionsHeight: number
    dimensionsDepth: number
    dimensionsUnit: string
    weight: number
    defaultVariantId: string | null
    relatedProductModelIds: string
    createdAt: Date
    updatedAt: Date
    _count: ProductModelCountAggregateOutputType | null
    _avg: ProductModelAvgAggregateOutputType | null
    _sum: ProductModelSumAggregateOutputType | null
    _min: ProductModelMinAggregateOutputType | null
    _max: ProductModelMaxAggregateOutputType | null
  }

  type GetProductModelGroupByPayload<T extends ProductModelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductModelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductModelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductModelGroupByOutputType[P]>
            : GetScalarType<T[P], ProductModelGroupByOutputType[P]>
        }
      >
    >


  export type ProductModelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    modelName?: boolean
    displayNamePT?: boolean
    displayNameEN?: boolean
    displayNameES?: boolean
    category?: boolean
    subcategory?: boolean
    productType?: boolean
    baseDescriptionPT?: boolean
    baseDescriptionEN?: boolean
    baseDescriptionES?: boolean
    baseFeatures?: boolean
    baseMaterials?: boolean
    dimensionsWidth?: boolean
    dimensionsHeight?: boolean
    dimensionsDepth?: boolean
    dimensionsUnit?: boolean
    weight?: boolean
    defaultVariantId?: boolean
    relatedProductModelIds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    variants?: boolean | ProductModel$variantsArgs<ExtArgs>
    defaultVariant?: boolean | ProductModel$defaultVariantArgs<ExtArgs>
    _count?: boolean | ProductModelCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productModel"]>

  export type ProductModelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    modelName?: boolean
    displayNamePT?: boolean
    displayNameEN?: boolean
    displayNameES?: boolean
    category?: boolean
    subcategory?: boolean
    productType?: boolean
    baseDescriptionPT?: boolean
    baseDescriptionEN?: boolean
    baseDescriptionES?: boolean
    baseFeatures?: boolean
    baseMaterials?: boolean
    dimensionsWidth?: boolean
    dimensionsHeight?: boolean
    dimensionsDepth?: boolean
    dimensionsUnit?: boolean
    weight?: boolean
    defaultVariantId?: boolean
    relatedProductModelIds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    defaultVariant?: boolean | ProductModel$defaultVariantArgs<ExtArgs>
  }, ExtArgs["result"]["productModel"]>

  export type ProductModelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    modelName?: boolean
    displayNamePT?: boolean
    displayNameEN?: boolean
    displayNameES?: boolean
    category?: boolean
    subcategory?: boolean
    productType?: boolean
    baseDescriptionPT?: boolean
    baseDescriptionEN?: boolean
    baseDescriptionES?: boolean
    baseFeatures?: boolean
    baseMaterials?: boolean
    dimensionsWidth?: boolean
    dimensionsHeight?: boolean
    dimensionsDepth?: boolean
    dimensionsUnit?: boolean
    weight?: boolean
    defaultVariantId?: boolean
    relatedProductModelIds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    defaultVariant?: boolean | ProductModel$defaultVariantArgs<ExtArgs>
  }, ExtArgs["result"]["productModel"]>

  export type ProductModelSelectScalar = {
    id?: boolean
    modelName?: boolean
    displayNamePT?: boolean
    displayNameEN?: boolean
    displayNameES?: boolean
    category?: boolean
    subcategory?: boolean
    productType?: boolean
    baseDescriptionPT?: boolean
    baseDescriptionEN?: boolean
    baseDescriptionES?: boolean
    baseFeatures?: boolean
    baseMaterials?: boolean
    dimensionsWidth?: boolean
    dimensionsHeight?: boolean
    dimensionsDepth?: boolean
    dimensionsUnit?: boolean
    weight?: boolean
    defaultVariantId?: boolean
    relatedProductModelIds?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductModelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "modelName" | "displayNamePT" | "displayNameEN" | "displayNameES" | "category" | "subcategory" | "productType" | "baseDescriptionPT" | "baseDescriptionEN" | "baseDescriptionES" | "baseFeatures" | "baseMaterials" | "dimensionsWidth" | "dimensionsHeight" | "dimensionsDepth" | "dimensionsUnit" | "weight" | "defaultVariantId" | "relatedProductModelIds" | "createdAt" | "updatedAt", ExtArgs["result"]["productModel"]>
  export type ProductModelInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    variants?: boolean | ProductModel$variantsArgs<ExtArgs>
    defaultVariant?: boolean | ProductModel$defaultVariantArgs<ExtArgs>
    _count?: boolean | ProductModelCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ProductModelIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    defaultVariant?: boolean | ProductModel$defaultVariantArgs<ExtArgs>
  }
  export type ProductModelIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    defaultVariant?: boolean | ProductModel$defaultVariantArgs<ExtArgs>
  }

  export type $ProductModelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductModel"
    objects: {
      variants: Prisma.$ProductVariantPayload<ExtArgs>[]
      defaultVariant: Prisma.$ProductVariantPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      modelName: string
      displayNamePT: string
      displayNameEN: string
      displayNameES: string
      category: string
      subcategory: string
      productType: string
      baseDescriptionPT: string
      baseDescriptionEN: string
      baseDescriptionES: string
      baseFeatures: string
      baseMaterials: string
      dimensionsWidth: number
      dimensionsHeight: number
      dimensionsDepth: number
      dimensionsUnit: string
      weight: number
      defaultVariantId: string | null
      relatedProductModelIds: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["productModel"]>
    composites: {}
  }

  type ProductModelGetPayload<S extends boolean | null | undefined | ProductModelDefaultArgs> = $Result.GetResult<Prisma.$ProductModelPayload, S>

  type ProductModelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductModelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductModelCountAggregateInputType | true
    }

  export interface ProductModelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductModel'], meta: { name: 'ProductModel' } }
    /**
     * Find zero or one ProductModel that matches the filter.
     * @param {ProductModelFindUniqueArgs} args - Arguments to find a ProductModel
     * @example
     * // Get one ProductModel
     * const productModel = await prisma.productModel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductModelFindUniqueArgs>(args: SelectSubset<T, ProductModelFindUniqueArgs<ExtArgs>>): Prisma__ProductModelClient<$Result.GetResult<Prisma.$ProductModelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductModel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductModelFindUniqueOrThrowArgs} args - Arguments to find a ProductModel
     * @example
     * // Get one ProductModel
     * const productModel = await prisma.productModel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductModelFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductModelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductModelClient<$Result.GetResult<Prisma.$ProductModelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductModel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductModelFindFirstArgs} args - Arguments to find a ProductModel
     * @example
     * // Get one ProductModel
     * const productModel = await prisma.productModel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductModelFindFirstArgs>(args?: SelectSubset<T, ProductModelFindFirstArgs<ExtArgs>>): Prisma__ProductModelClient<$Result.GetResult<Prisma.$ProductModelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductModel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductModelFindFirstOrThrowArgs} args - Arguments to find a ProductModel
     * @example
     * // Get one ProductModel
     * const productModel = await prisma.productModel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductModelFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductModelFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductModelClient<$Result.GetResult<Prisma.$ProductModelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductModels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductModelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductModels
     * const productModels = await prisma.productModel.findMany()
     * 
     * // Get first 10 ProductModels
     * const productModels = await prisma.productModel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productModelWithIdOnly = await prisma.productModel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductModelFindManyArgs>(args?: SelectSubset<T, ProductModelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductModelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductModel.
     * @param {ProductModelCreateArgs} args - Arguments to create a ProductModel.
     * @example
     * // Create one ProductModel
     * const ProductModel = await prisma.productModel.create({
     *   data: {
     *     // ... data to create a ProductModel
     *   }
     * })
     * 
     */
    create<T extends ProductModelCreateArgs>(args: SelectSubset<T, ProductModelCreateArgs<ExtArgs>>): Prisma__ProductModelClient<$Result.GetResult<Prisma.$ProductModelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductModels.
     * @param {ProductModelCreateManyArgs} args - Arguments to create many ProductModels.
     * @example
     * // Create many ProductModels
     * const productModel = await prisma.productModel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductModelCreateManyArgs>(args?: SelectSubset<T, ProductModelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductModels and returns the data saved in the database.
     * @param {ProductModelCreateManyAndReturnArgs} args - Arguments to create many ProductModels.
     * @example
     * // Create many ProductModels
     * const productModel = await prisma.productModel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductModels and only return the `id`
     * const productModelWithIdOnly = await prisma.productModel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductModelCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductModelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductModelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductModel.
     * @param {ProductModelDeleteArgs} args - Arguments to delete one ProductModel.
     * @example
     * // Delete one ProductModel
     * const ProductModel = await prisma.productModel.delete({
     *   where: {
     *     // ... filter to delete one ProductModel
     *   }
     * })
     * 
     */
    delete<T extends ProductModelDeleteArgs>(args: SelectSubset<T, ProductModelDeleteArgs<ExtArgs>>): Prisma__ProductModelClient<$Result.GetResult<Prisma.$ProductModelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductModel.
     * @param {ProductModelUpdateArgs} args - Arguments to update one ProductModel.
     * @example
     * // Update one ProductModel
     * const productModel = await prisma.productModel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductModelUpdateArgs>(args: SelectSubset<T, ProductModelUpdateArgs<ExtArgs>>): Prisma__ProductModelClient<$Result.GetResult<Prisma.$ProductModelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductModels.
     * @param {ProductModelDeleteManyArgs} args - Arguments to filter ProductModels to delete.
     * @example
     * // Delete a few ProductModels
     * const { count } = await prisma.productModel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductModelDeleteManyArgs>(args?: SelectSubset<T, ProductModelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductModelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductModels
     * const productModel = await prisma.productModel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductModelUpdateManyArgs>(args: SelectSubset<T, ProductModelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductModels and returns the data updated in the database.
     * @param {ProductModelUpdateManyAndReturnArgs} args - Arguments to update many ProductModels.
     * @example
     * // Update many ProductModels
     * const productModel = await prisma.productModel.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductModels and only return the `id`
     * const productModelWithIdOnly = await prisma.productModel.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductModelUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductModelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductModelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductModel.
     * @param {ProductModelUpsertArgs} args - Arguments to update or create a ProductModel.
     * @example
     * // Update or create a ProductModel
     * const productModel = await prisma.productModel.upsert({
     *   create: {
     *     // ... data to create a ProductModel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductModel we want to update
     *   }
     * })
     */
    upsert<T extends ProductModelUpsertArgs>(args: SelectSubset<T, ProductModelUpsertArgs<ExtArgs>>): Prisma__ProductModelClient<$Result.GetResult<Prisma.$ProductModelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductModels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductModelCountArgs} args - Arguments to filter ProductModels to count.
     * @example
     * // Count the number of ProductModels
     * const count = await prisma.productModel.count({
     *   where: {
     *     // ... the filter for the ProductModels we want to count
     *   }
     * })
    **/
    count<T extends ProductModelCountArgs>(
      args?: Subset<T, ProductModelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductModelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductModelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductModelAggregateArgs>(args: Subset<T, ProductModelAggregateArgs>): Prisma.PrismaPromise<GetProductModelAggregateType<T>>

    /**
     * Group by ProductModel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductModelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductModelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductModelGroupByArgs['orderBy'] }
        : { orderBy?: ProductModelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductModelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductModelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductModel model
   */
  readonly fields: ProductModelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductModel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductModelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    variants<T extends ProductModel$variantsArgs<ExtArgs> = {}>(args?: Subset<T, ProductModel$variantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    defaultVariant<T extends ProductModel$defaultVariantArgs<ExtArgs> = {}>(args?: Subset<T, ProductModel$defaultVariantArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductModel model
   */
  interface ProductModelFieldRefs {
    readonly id: FieldRef<"ProductModel", 'String'>
    readonly modelName: FieldRef<"ProductModel", 'String'>
    readonly displayNamePT: FieldRef<"ProductModel", 'String'>
    readonly displayNameEN: FieldRef<"ProductModel", 'String'>
    readonly displayNameES: FieldRef<"ProductModel", 'String'>
    readonly category: FieldRef<"ProductModel", 'String'>
    readonly subcategory: FieldRef<"ProductModel", 'String'>
    readonly productType: FieldRef<"ProductModel", 'String'>
    readonly baseDescriptionPT: FieldRef<"ProductModel", 'String'>
    readonly baseDescriptionEN: FieldRef<"ProductModel", 'String'>
    readonly baseDescriptionES: FieldRef<"ProductModel", 'String'>
    readonly baseFeatures: FieldRef<"ProductModel", 'String'>
    readonly baseMaterials: FieldRef<"ProductModel", 'String'>
    readonly dimensionsWidth: FieldRef<"ProductModel", 'Float'>
    readonly dimensionsHeight: FieldRef<"ProductModel", 'Float'>
    readonly dimensionsDepth: FieldRef<"ProductModel", 'Float'>
    readonly dimensionsUnit: FieldRef<"ProductModel", 'String'>
    readonly weight: FieldRef<"ProductModel", 'Float'>
    readonly defaultVariantId: FieldRef<"ProductModel", 'String'>
    readonly relatedProductModelIds: FieldRef<"ProductModel", 'String'>
    readonly createdAt: FieldRef<"ProductModel", 'DateTime'>
    readonly updatedAt: FieldRef<"ProductModel", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductModel findUnique
   */
  export type ProductModelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductModel
     */
    select?: ProductModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductModel
     */
    omit?: ProductModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductModelInclude<ExtArgs> | null
    /**
     * Filter, which ProductModel to fetch.
     */
    where: ProductModelWhereUniqueInput
  }

  /**
   * ProductModel findUniqueOrThrow
   */
  export type ProductModelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductModel
     */
    select?: ProductModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductModel
     */
    omit?: ProductModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductModelInclude<ExtArgs> | null
    /**
     * Filter, which ProductModel to fetch.
     */
    where: ProductModelWhereUniqueInput
  }

  /**
   * ProductModel findFirst
   */
  export type ProductModelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductModel
     */
    select?: ProductModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductModel
     */
    omit?: ProductModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductModelInclude<ExtArgs> | null
    /**
     * Filter, which ProductModel to fetch.
     */
    where?: ProductModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductModels to fetch.
     */
    orderBy?: ProductModelOrderByWithRelationInput | ProductModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductModels.
     */
    cursor?: ProductModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductModels.
     */
    distinct?: ProductModelScalarFieldEnum | ProductModelScalarFieldEnum[]
  }

  /**
   * ProductModel findFirstOrThrow
   */
  export type ProductModelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductModel
     */
    select?: ProductModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductModel
     */
    omit?: ProductModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductModelInclude<ExtArgs> | null
    /**
     * Filter, which ProductModel to fetch.
     */
    where?: ProductModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductModels to fetch.
     */
    orderBy?: ProductModelOrderByWithRelationInput | ProductModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductModels.
     */
    cursor?: ProductModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductModels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductModels.
     */
    distinct?: ProductModelScalarFieldEnum | ProductModelScalarFieldEnum[]
  }

  /**
   * ProductModel findMany
   */
  export type ProductModelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductModel
     */
    select?: ProductModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductModel
     */
    omit?: ProductModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductModelInclude<ExtArgs> | null
    /**
     * Filter, which ProductModels to fetch.
     */
    where?: ProductModelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductModels to fetch.
     */
    orderBy?: ProductModelOrderByWithRelationInput | ProductModelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductModels.
     */
    cursor?: ProductModelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductModels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductModels.
     */
    skip?: number
    distinct?: ProductModelScalarFieldEnum | ProductModelScalarFieldEnum[]
  }

  /**
   * ProductModel create
   */
  export type ProductModelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductModel
     */
    select?: ProductModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductModel
     */
    omit?: ProductModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductModelInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductModel.
     */
    data: XOR<ProductModelCreateInput, ProductModelUncheckedCreateInput>
  }

  /**
   * ProductModel createMany
   */
  export type ProductModelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductModels.
     */
    data: ProductModelCreateManyInput | ProductModelCreateManyInput[]
  }

  /**
   * ProductModel createManyAndReturn
   */
  export type ProductModelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductModel
     */
    select?: ProductModelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductModel
     */
    omit?: ProductModelOmit<ExtArgs> | null
    /**
     * The data used to create many ProductModels.
     */
    data: ProductModelCreateManyInput | ProductModelCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductModelIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductModel update
   */
  export type ProductModelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductModel
     */
    select?: ProductModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductModel
     */
    omit?: ProductModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductModelInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductModel.
     */
    data: XOR<ProductModelUpdateInput, ProductModelUncheckedUpdateInput>
    /**
     * Choose, which ProductModel to update.
     */
    where: ProductModelWhereUniqueInput
  }

  /**
   * ProductModel updateMany
   */
  export type ProductModelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductModels.
     */
    data: XOR<ProductModelUpdateManyMutationInput, ProductModelUncheckedUpdateManyInput>
    /**
     * Filter which ProductModels to update
     */
    where?: ProductModelWhereInput
    /**
     * Limit how many ProductModels to update.
     */
    limit?: number
  }

  /**
   * ProductModel updateManyAndReturn
   */
  export type ProductModelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductModel
     */
    select?: ProductModelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductModel
     */
    omit?: ProductModelOmit<ExtArgs> | null
    /**
     * The data used to update ProductModels.
     */
    data: XOR<ProductModelUpdateManyMutationInput, ProductModelUncheckedUpdateManyInput>
    /**
     * Filter which ProductModels to update
     */
    where?: ProductModelWhereInput
    /**
     * Limit how many ProductModels to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductModelIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductModel upsert
   */
  export type ProductModelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductModel
     */
    select?: ProductModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductModel
     */
    omit?: ProductModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductModelInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductModel to update in case it exists.
     */
    where: ProductModelWhereUniqueInput
    /**
     * In case the ProductModel found by the `where` argument doesn't exist, create a new ProductModel with this data.
     */
    create: XOR<ProductModelCreateInput, ProductModelUncheckedCreateInput>
    /**
     * In case the ProductModel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductModelUpdateInput, ProductModelUncheckedUpdateInput>
  }

  /**
   * ProductModel delete
   */
  export type ProductModelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductModel
     */
    select?: ProductModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductModel
     */
    omit?: ProductModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductModelInclude<ExtArgs> | null
    /**
     * Filter which ProductModel to delete.
     */
    where: ProductModelWhereUniqueInput
  }

  /**
   * ProductModel deleteMany
   */
  export type ProductModelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductModels to delete
     */
    where?: ProductModelWhereInput
    /**
     * Limit how many ProductModels to delete.
     */
    limit?: number
  }

  /**
   * ProductModel.variants
   */
  export type ProductModel$variantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    where?: ProductVariantWhereInput
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    cursor?: ProductVariantWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[]
  }

  /**
   * ProductModel.defaultVariant
   */
  export type ProductModel$defaultVariantArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    where?: ProductVariantWhereInput
  }

  /**
   * ProductModel without action
   */
  export type ProductModelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductModel
     */
    select?: ProductModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductModel
     */
    omit?: ProductModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductModelInclude<ExtArgs> | null
  }


  /**
   * Model ProductVariant
   */

  export type AggregateProductVariant = {
    _count: ProductVariantCountAggregateOutputType | null
    _min: ProductVariantMinAggregateOutputType | null
    _max: ProductVariantMaxAggregateOutputType | null
  }

  export type ProductVariantMinAggregateOutputType = {
    id: string | null
    modelId: string | null
    colorKey: string | null
    colorNamePT: string | null
    colorNameEN: string | null
    colorNameES: string | null
    colorHex: string | null
    mainImageURL: string | null
    angleImageURLs: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductVariantMaxAggregateOutputType = {
    id: string | null
    modelId: string | null
    colorKey: string | null
    colorNamePT: string | null
    colorNameEN: string | null
    colorNameES: string | null
    colorHex: string | null
    mainImageURL: string | null
    angleImageURLs: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductVariantCountAggregateOutputType = {
    id: number
    modelId: number
    colorKey: number
    colorNamePT: number
    colorNameEN: number
    colorNameES: number
    colorHex: number
    mainImageURL: number
    angleImageURLs: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductVariantMinAggregateInputType = {
    id?: true
    modelId?: true
    colorKey?: true
    colorNamePT?: true
    colorNameEN?: true
    colorNameES?: true
    colorHex?: true
    mainImageURL?: true
    angleImageURLs?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductVariantMaxAggregateInputType = {
    id?: true
    modelId?: true
    colorKey?: true
    colorNamePT?: true
    colorNameEN?: true
    colorNameES?: true
    colorHex?: true
    mainImageURL?: true
    angleImageURLs?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductVariantCountAggregateInputType = {
    id?: true
    modelId?: true
    colorKey?: true
    colorNamePT?: true
    colorNameEN?: true
    colorNameES?: true
    colorHex?: true
    mainImageURL?: true
    angleImageURLs?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductVariantAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductVariant to aggregate.
     */
    where?: ProductVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProductVariants
    **/
    _count?: true | ProductVariantCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductVariantMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductVariantMaxAggregateInputType
  }

  export type GetProductVariantAggregateType<T extends ProductVariantAggregateArgs> = {
        [P in keyof T & keyof AggregateProductVariant]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProductVariant[P]>
      : GetScalarType<T[P], AggregateProductVariant[P]>
  }




  export type ProductVariantGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductVariantWhereInput
    orderBy?: ProductVariantOrderByWithAggregationInput | ProductVariantOrderByWithAggregationInput[]
    by: ProductVariantScalarFieldEnum[] | ProductVariantScalarFieldEnum
    having?: ProductVariantScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductVariantCountAggregateInputType | true
    _min?: ProductVariantMinAggregateInputType
    _max?: ProductVariantMaxAggregateInputType
  }

  export type ProductVariantGroupByOutputType = {
    id: string
    modelId: string
    colorKey: string
    colorNamePT: string
    colorNameEN: string
    colorNameES: string
    colorHex: string
    mainImageURL: string | null
    angleImageURLs: string
    createdAt: Date
    updatedAt: Date
    _count: ProductVariantCountAggregateOutputType | null
    _min: ProductVariantMinAggregateOutputType | null
    _max: ProductVariantMaxAggregateOutputType | null
  }

  type GetProductVariantGroupByPayload<T extends ProductVariantGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductVariantGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductVariantGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductVariantGroupByOutputType[P]>
            : GetScalarType<T[P], ProductVariantGroupByOutputType[P]>
        }
      >
    >


  export type ProductVariantSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    modelId?: boolean
    colorKey?: boolean
    colorNamePT?: boolean
    colorNameEN?: boolean
    colorNameES?: boolean
    colorHex?: boolean
    mainImageURL?: boolean
    angleImageURLs?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    model?: boolean | ProductModelDefaultArgs<ExtArgs>
    defaultForModel?: boolean | ProductVariant$defaultForModelArgs<ExtArgs>
  }, ExtArgs["result"]["productVariant"]>

  export type ProductVariantSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    modelId?: boolean
    colorKey?: boolean
    colorNamePT?: boolean
    colorNameEN?: boolean
    colorNameES?: boolean
    colorHex?: boolean
    mainImageURL?: boolean
    angleImageURLs?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    model?: boolean | ProductModelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productVariant"]>

  export type ProductVariantSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    modelId?: boolean
    colorKey?: boolean
    colorNamePT?: boolean
    colorNameEN?: boolean
    colorNameES?: boolean
    colorHex?: boolean
    mainImageURL?: boolean
    angleImageURLs?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    model?: boolean | ProductModelDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["productVariant"]>

  export type ProductVariantSelectScalar = {
    id?: boolean
    modelId?: boolean
    colorKey?: boolean
    colorNamePT?: boolean
    colorNameEN?: boolean
    colorNameES?: boolean
    colorHex?: boolean
    mainImageURL?: boolean
    angleImageURLs?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductVariantOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "modelId" | "colorKey" | "colorNamePT" | "colorNameEN" | "colorNameES" | "colorHex" | "mainImageURL" | "angleImageURLs" | "createdAt" | "updatedAt", ExtArgs["result"]["productVariant"]>
  export type ProductVariantInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    model?: boolean | ProductModelDefaultArgs<ExtArgs>
    defaultForModel?: boolean | ProductVariant$defaultForModelArgs<ExtArgs>
  }
  export type ProductVariantIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    model?: boolean | ProductModelDefaultArgs<ExtArgs>
  }
  export type ProductVariantIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    model?: boolean | ProductModelDefaultArgs<ExtArgs>
  }

  export type $ProductVariantPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProductVariant"
    objects: {
      model: Prisma.$ProductModelPayload<ExtArgs>
      defaultForModel: Prisma.$ProductModelPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      modelId: string
      colorKey: string
      colorNamePT: string
      colorNameEN: string
      colorNameES: string
      colorHex: string
      mainImageURL: string | null
      angleImageURLs: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["productVariant"]>
    composites: {}
  }

  type ProductVariantGetPayload<S extends boolean | null | undefined | ProductVariantDefaultArgs> = $Result.GetResult<Prisma.$ProductVariantPayload, S>

  type ProductVariantCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductVariantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductVariantCountAggregateInputType | true
    }

  export interface ProductVariantDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProductVariant'], meta: { name: 'ProductVariant' } }
    /**
     * Find zero or one ProductVariant that matches the filter.
     * @param {ProductVariantFindUniqueArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductVariantFindUniqueArgs>(args: SelectSubset<T, ProductVariantFindUniqueArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProductVariant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductVariantFindUniqueOrThrowArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductVariantFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductVariantFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductVariant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantFindFirstArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductVariantFindFirstArgs>(args?: SelectSubset<T, ProductVariantFindFirstArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProductVariant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantFindFirstOrThrowArgs} args - Arguments to find a ProductVariant
     * @example
     * // Get one ProductVariant
     * const productVariant = await prisma.productVariant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductVariantFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductVariantFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProductVariants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProductVariants
     * const productVariants = await prisma.productVariant.findMany()
     * 
     * // Get first 10 ProductVariants
     * const productVariants = await prisma.productVariant.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productVariantWithIdOnly = await prisma.productVariant.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductVariantFindManyArgs>(args?: SelectSubset<T, ProductVariantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProductVariant.
     * @param {ProductVariantCreateArgs} args - Arguments to create a ProductVariant.
     * @example
     * // Create one ProductVariant
     * const ProductVariant = await prisma.productVariant.create({
     *   data: {
     *     // ... data to create a ProductVariant
     *   }
     * })
     * 
     */
    create<T extends ProductVariantCreateArgs>(args: SelectSubset<T, ProductVariantCreateArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProductVariants.
     * @param {ProductVariantCreateManyArgs} args - Arguments to create many ProductVariants.
     * @example
     * // Create many ProductVariants
     * const productVariant = await prisma.productVariant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductVariantCreateManyArgs>(args?: SelectSubset<T, ProductVariantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProductVariants and returns the data saved in the database.
     * @param {ProductVariantCreateManyAndReturnArgs} args - Arguments to create many ProductVariants.
     * @example
     * // Create many ProductVariants
     * const productVariant = await prisma.productVariant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProductVariants and only return the `id`
     * const productVariantWithIdOnly = await prisma.productVariant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductVariantCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductVariantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProductVariant.
     * @param {ProductVariantDeleteArgs} args - Arguments to delete one ProductVariant.
     * @example
     * // Delete one ProductVariant
     * const ProductVariant = await prisma.productVariant.delete({
     *   where: {
     *     // ... filter to delete one ProductVariant
     *   }
     * })
     * 
     */
    delete<T extends ProductVariantDeleteArgs>(args: SelectSubset<T, ProductVariantDeleteArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProductVariant.
     * @param {ProductVariantUpdateArgs} args - Arguments to update one ProductVariant.
     * @example
     * // Update one ProductVariant
     * const productVariant = await prisma.productVariant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductVariantUpdateArgs>(args: SelectSubset<T, ProductVariantUpdateArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProductVariants.
     * @param {ProductVariantDeleteManyArgs} args - Arguments to filter ProductVariants to delete.
     * @example
     * // Delete a few ProductVariants
     * const { count } = await prisma.productVariant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductVariantDeleteManyArgs>(args?: SelectSubset<T, ProductVariantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductVariants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProductVariants
     * const productVariant = await prisma.productVariant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductVariantUpdateManyArgs>(args: SelectSubset<T, ProductVariantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProductVariants and returns the data updated in the database.
     * @param {ProductVariantUpdateManyAndReturnArgs} args - Arguments to update many ProductVariants.
     * @example
     * // Update many ProductVariants
     * const productVariant = await prisma.productVariant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProductVariants and only return the `id`
     * const productVariantWithIdOnly = await prisma.productVariant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductVariantUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductVariantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProductVariant.
     * @param {ProductVariantUpsertArgs} args - Arguments to update or create a ProductVariant.
     * @example
     * // Update or create a ProductVariant
     * const productVariant = await prisma.productVariant.upsert({
     *   create: {
     *     // ... data to create a ProductVariant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProductVariant we want to update
     *   }
     * })
     */
    upsert<T extends ProductVariantUpsertArgs>(args: SelectSubset<T, ProductVariantUpsertArgs<ExtArgs>>): Prisma__ProductVariantClient<$Result.GetResult<Prisma.$ProductVariantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProductVariants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantCountArgs} args - Arguments to filter ProductVariants to count.
     * @example
     * // Count the number of ProductVariants
     * const count = await prisma.productVariant.count({
     *   where: {
     *     // ... the filter for the ProductVariants we want to count
     *   }
     * })
    **/
    count<T extends ProductVariantCountArgs>(
      args?: Subset<T, ProductVariantCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductVariantCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProductVariant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductVariantAggregateArgs>(args: Subset<T, ProductVariantAggregateArgs>): Prisma.PrismaPromise<GetProductVariantAggregateType<T>>

    /**
     * Group by ProductVariant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductVariantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductVariantGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductVariantGroupByArgs['orderBy'] }
        : { orderBy?: ProductVariantGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductVariantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductVariantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProductVariant model
   */
  readonly fields: ProductVariantFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProductVariant.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductVariantClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    model<T extends ProductModelDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductModelDefaultArgs<ExtArgs>>): Prisma__ProductModelClient<$Result.GetResult<Prisma.$ProductModelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    defaultForModel<T extends ProductVariant$defaultForModelArgs<ExtArgs> = {}>(args?: Subset<T, ProductVariant$defaultForModelArgs<ExtArgs>>): Prisma__ProductModelClient<$Result.GetResult<Prisma.$ProductModelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProductVariant model
   */
  interface ProductVariantFieldRefs {
    readonly id: FieldRef<"ProductVariant", 'String'>
    readonly modelId: FieldRef<"ProductVariant", 'String'>
    readonly colorKey: FieldRef<"ProductVariant", 'String'>
    readonly colorNamePT: FieldRef<"ProductVariant", 'String'>
    readonly colorNameEN: FieldRef<"ProductVariant", 'String'>
    readonly colorNameES: FieldRef<"ProductVariant", 'String'>
    readonly colorHex: FieldRef<"ProductVariant", 'String'>
    readonly mainImageURL: FieldRef<"ProductVariant", 'String'>
    readonly angleImageURLs: FieldRef<"ProductVariant", 'String'>
    readonly createdAt: FieldRef<"ProductVariant", 'DateTime'>
    readonly updatedAt: FieldRef<"ProductVariant", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProductVariant findUnique
   */
  export type ProductVariantFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariant to fetch.
     */
    where: ProductVariantWhereUniqueInput
  }

  /**
   * ProductVariant findUniqueOrThrow
   */
  export type ProductVariantFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariant to fetch.
     */
    where: ProductVariantWhereUniqueInput
  }

  /**
   * ProductVariant findFirst
   */
  export type ProductVariantFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariant to fetch.
     */
    where?: ProductVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductVariants.
     */
    cursor?: ProductVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductVariants.
     */
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[]
  }

  /**
   * ProductVariant findFirstOrThrow
   */
  export type ProductVariantFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariant to fetch.
     */
    where?: ProductVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProductVariants.
     */
    cursor?: ProductVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductVariants.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProductVariants.
     */
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[]
  }

  /**
   * ProductVariant findMany
   */
  export type ProductVariantFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter, which ProductVariants to fetch.
     */
    where?: ProductVariantWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProductVariants to fetch.
     */
    orderBy?: ProductVariantOrderByWithRelationInput | ProductVariantOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProductVariants.
     */
    cursor?: ProductVariantWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProductVariants from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProductVariants.
     */
    skip?: number
    distinct?: ProductVariantScalarFieldEnum | ProductVariantScalarFieldEnum[]
  }

  /**
   * ProductVariant create
   */
  export type ProductVariantCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * The data needed to create a ProductVariant.
     */
    data: XOR<ProductVariantCreateInput, ProductVariantUncheckedCreateInput>
  }

  /**
   * ProductVariant createMany
   */
  export type ProductVariantCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProductVariants.
     */
    data: ProductVariantCreateManyInput | ProductVariantCreateManyInput[]
  }

  /**
   * ProductVariant createManyAndReturn
   */
  export type ProductVariantCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * The data used to create many ProductVariants.
     */
    data: ProductVariantCreateManyInput | ProductVariantCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductVariant update
   */
  export type ProductVariantUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * The data needed to update a ProductVariant.
     */
    data: XOR<ProductVariantUpdateInput, ProductVariantUncheckedUpdateInput>
    /**
     * Choose, which ProductVariant to update.
     */
    where: ProductVariantWhereUniqueInput
  }

  /**
   * ProductVariant updateMany
   */
  export type ProductVariantUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProductVariants.
     */
    data: XOR<ProductVariantUpdateManyMutationInput, ProductVariantUncheckedUpdateManyInput>
    /**
     * Filter which ProductVariants to update
     */
    where?: ProductVariantWhereInput
    /**
     * Limit how many ProductVariants to update.
     */
    limit?: number
  }

  /**
   * ProductVariant updateManyAndReturn
   */
  export type ProductVariantUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * The data used to update ProductVariants.
     */
    data: XOR<ProductVariantUpdateManyMutationInput, ProductVariantUncheckedUpdateManyInput>
    /**
     * Filter which ProductVariants to update
     */
    where?: ProductVariantWhereInput
    /**
     * Limit how many ProductVariants to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProductVariant upsert
   */
  export type ProductVariantUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * The filter to search for the ProductVariant to update in case it exists.
     */
    where: ProductVariantWhereUniqueInput
    /**
     * In case the ProductVariant found by the `where` argument doesn't exist, create a new ProductVariant with this data.
     */
    create: XOR<ProductVariantCreateInput, ProductVariantUncheckedCreateInput>
    /**
     * In case the ProductVariant was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductVariantUpdateInput, ProductVariantUncheckedUpdateInput>
  }

  /**
   * ProductVariant delete
   */
  export type ProductVariantDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
    /**
     * Filter which ProductVariant to delete.
     */
    where: ProductVariantWhereUniqueInput
  }

  /**
   * ProductVariant deleteMany
   */
  export type ProductVariantDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProductVariants to delete
     */
    where?: ProductVariantWhereInput
    /**
     * Limit how many ProductVariants to delete.
     */
    limit?: number
  }

  /**
   * ProductVariant.defaultForModel
   */
  export type ProductVariant$defaultForModelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductModel
     */
    select?: ProductModelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductModel
     */
    omit?: ProductModelOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductModelInclude<ExtArgs> | null
    where?: ProductModelWhereInput
  }

  /**
   * ProductVariant without action
   */
  export type ProductVariantDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductVariant
     */
    select?: ProductVariantSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProductVariant
     */
    omit?: ProductVariantOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductVariantInclude<ExtArgs> | null
  }


  /**
   * Model Project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    titlePT: string | null
    titleEN: string | null
    titleES: string | null
    imageUrl: string | null
    location: string | null
    descriptionPT: string | null
    descriptionEN: string | null
    descriptionES: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    titlePT: string | null
    titleEN: string | null
    titleES: string | null
    imageUrl: string | null
    location: string | null
    descriptionPT: string | null
    descriptionEN: string | null
    descriptionES: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    titlePT: number
    titleEN: number
    titleES: number
    imageUrl: number
    location: number
    descriptionPT: number
    descriptionEN: number
    descriptionES: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProjectMinAggregateInputType = {
    id?: true
    titlePT?: true
    titleEN?: true
    titleES?: true
    imageUrl?: true
    location?: true
    descriptionPT?: true
    descriptionEN?: true
    descriptionES?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    titlePT?: true
    titleEN?: true
    titleES?: true
    imageUrl?: true
    location?: true
    descriptionPT?: true
    descriptionEN?: true
    descriptionES?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    titlePT?: true
    titleEN?: true
    titleES?: true
    imageUrl?: true
    location?: true
    descriptionPT?: true
    descriptionEN?: true
    descriptionES?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProjectWhereInput
    orderBy?: ProjectOrderByWithAggregationInput | ProjectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    id: string
    titlePT: string | null
    titleEN: string | null
    titleES: string | null
    imageUrl: string
    location: string | null
    descriptionPT: string | null
    descriptionEN: string | null
    descriptionES: string | null
    createdAt: Date
    updatedAt: Date
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titlePT?: boolean
    titleEN?: boolean
    titleES?: boolean
    imageUrl?: boolean
    location?: boolean
    descriptionPT?: boolean
    descriptionEN?: boolean
    descriptionES?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titlePT?: boolean
    titleEN?: boolean
    titleES?: boolean
    imageUrl?: boolean
    location?: boolean
    descriptionPT?: boolean
    descriptionEN?: boolean
    descriptionES?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    titlePT?: boolean
    titleEN?: boolean
    titleES?: boolean
    imageUrl?: boolean
    location?: boolean
    descriptionPT?: boolean
    descriptionEN?: boolean
    descriptionES?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["project"]>

  export type ProjectSelectScalar = {
    id?: boolean
    titlePT?: boolean
    titleEN?: boolean
    titleES?: boolean
    imageUrl?: boolean
    location?: boolean
    descriptionPT?: boolean
    descriptionEN?: boolean
    descriptionES?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "titlePT" | "titleEN" | "titleES" | "imageUrl" | "location" | "descriptionPT" | "descriptionEN" | "descriptionES" | "createdAt" | "updatedAt", ExtArgs["result"]["project"]>

  export type $ProjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Project"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      titlePT: string | null
      titleEN: string | null
      titleES: string | null
      imageUrl: string
      location: string | null
      descriptionPT: string | null
      descriptionEN: string | null
      descriptionES: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = $Result.GetResult<Prisma.$ProjectPayload, S>

  type ProjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Project'], meta: { name: 'Project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProjectFindUniqueArgs>(args: SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProjectFindFirstArgs>(args?: SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProjectFindManyArgs>(args?: SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends ProjectCreateArgs>(args: SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProjectCreateManyArgs>(args?: SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {ProjectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends ProjectDeleteArgs>(args: SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProjectUpdateArgs>(args: SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProjectDeleteManyArgs>(args?: SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProjectUpdateManyArgs>(args: SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {ProjectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `id`
     * const projectWithIdOnly = await prisma.project.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends ProjectUpsertArgs>(args: SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma__ProjectClient<$Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Project model
   */
  readonly fields: ProjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Project model
   */
  interface ProjectFieldRefs {
    readonly id: FieldRef<"Project", 'String'>
    readonly titlePT: FieldRef<"Project", 'String'>
    readonly titleEN: FieldRef<"Project", 'String'>
    readonly titleES: FieldRef<"Project", 'String'>
    readonly imageUrl: FieldRef<"Project", 'String'>
    readonly location: FieldRef<"Project", 'String'>
    readonly descriptionPT: FieldRef<"Project", 'String'>
    readonly descriptionEN: FieldRef<"Project", 'String'>
    readonly descriptionES: FieldRef<"Project", 'String'>
    readonly createdAt: FieldRef<"Project", 'DateTime'>
    readonly updatedAt: FieldRef<"Project", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Project findUnique
   */
  export type ProjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findFirst
   */
  export type ProjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: ProjectOrderByWithRelationInput | ProjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * Project create
   */
  export type ProjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }

  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
  }

  /**
   * Project createManyAndReturn
   */
  export type ProjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to create many Projects.
     */
    data: ProjectCreateManyInput | ProjectCreateManyInput[]
  }

  /**
   * Project update
   */
  export type ProjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project updateManyAndReturn
   */
  export type ProjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to update.
     */
    limit?: number
  }

  /**
   * Project upsert
   */
  export type ProjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }

  /**
   * Project delete
   */
  export type ProjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
    /**
     * Limit how many Projects to delete.
     */
    limit?: number
  }

  /**
   * Project without action
   */
  export type ProjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Project
     */
    omit?: ProjectOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ProductModelScalarFieldEnum: {
    id: 'id',
    modelName: 'modelName',
    displayNamePT: 'displayNamePT',
    displayNameEN: 'displayNameEN',
    displayNameES: 'displayNameES',
    category: 'category',
    subcategory: 'subcategory',
    productType: 'productType',
    baseDescriptionPT: 'baseDescriptionPT',
    baseDescriptionEN: 'baseDescriptionEN',
    baseDescriptionES: 'baseDescriptionES',
    baseFeatures: 'baseFeatures',
    baseMaterials: 'baseMaterials',
    dimensionsWidth: 'dimensionsWidth',
    dimensionsHeight: 'dimensionsHeight',
    dimensionsDepth: 'dimensionsDepth',
    dimensionsUnit: 'dimensionsUnit',
    weight: 'weight',
    defaultVariantId: 'defaultVariantId',
    relatedProductModelIds: 'relatedProductModelIds',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductModelScalarFieldEnum = (typeof ProductModelScalarFieldEnum)[keyof typeof ProductModelScalarFieldEnum]


  export const ProductVariantScalarFieldEnum: {
    id: 'id',
    modelId: 'modelId',
    colorKey: 'colorKey',
    colorNamePT: 'colorNamePT',
    colorNameEN: 'colorNameEN',
    colorNameES: 'colorNameES',
    colorHex: 'colorHex',
    mainImageURL: 'mainImageURL',
    angleImageURLs: 'angleImageURLs',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductVariantScalarFieldEnum = (typeof ProductVariantScalarFieldEnum)[keyof typeof ProductVariantScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    titlePT: 'titlePT',
    titleEN: 'titleEN',
    titleES: 'titleES',
    imageUrl: 'imageUrl',
    location: 'location',
    descriptionPT: 'descriptionPT',
    descriptionEN: 'descriptionEN',
    descriptionES: 'descriptionES',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type ProductModelWhereInput = {
    AND?: ProductModelWhereInput | ProductModelWhereInput[]
    OR?: ProductModelWhereInput[]
    NOT?: ProductModelWhereInput | ProductModelWhereInput[]
    id?: StringFilter<"ProductModel"> | string
    modelName?: StringFilter<"ProductModel"> | string
    displayNamePT?: StringFilter<"ProductModel"> | string
    displayNameEN?: StringFilter<"ProductModel"> | string
    displayNameES?: StringFilter<"ProductModel"> | string
    category?: StringFilter<"ProductModel"> | string
    subcategory?: StringFilter<"ProductModel"> | string
    productType?: StringFilter<"ProductModel"> | string
    baseDescriptionPT?: StringFilter<"ProductModel"> | string
    baseDescriptionEN?: StringFilter<"ProductModel"> | string
    baseDescriptionES?: StringFilter<"ProductModel"> | string
    baseFeatures?: StringFilter<"ProductModel"> | string
    baseMaterials?: StringFilter<"ProductModel"> | string
    dimensionsWidth?: FloatFilter<"ProductModel"> | number
    dimensionsHeight?: FloatFilter<"ProductModel"> | number
    dimensionsDepth?: FloatFilter<"ProductModel"> | number
    dimensionsUnit?: StringFilter<"ProductModel"> | string
    weight?: FloatFilter<"ProductModel"> | number
    defaultVariantId?: StringNullableFilter<"ProductModel"> | string | null
    relatedProductModelIds?: StringFilter<"ProductModel"> | string
    createdAt?: DateTimeFilter<"ProductModel"> | Date | string
    updatedAt?: DateTimeFilter<"ProductModel"> | Date | string
    variants?: ProductVariantListRelationFilter
    defaultVariant?: XOR<ProductVariantNullableScalarRelationFilter, ProductVariantWhereInput> | null
  }

  export type ProductModelOrderByWithRelationInput = {
    id?: SortOrder
    modelName?: SortOrder
    displayNamePT?: SortOrder
    displayNameEN?: SortOrder
    displayNameES?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    productType?: SortOrder
    baseDescriptionPT?: SortOrder
    baseDescriptionEN?: SortOrder
    baseDescriptionES?: SortOrder
    baseFeatures?: SortOrder
    baseMaterials?: SortOrder
    dimensionsWidth?: SortOrder
    dimensionsHeight?: SortOrder
    dimensionsDepth?: SortOrder
    dimensionsUnit?: SortOrder
    weight?: SortOrder
    defaultVariantId?: SortOrderInput | SortOrder
    relatedProductModelIds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    variants?: ProductVariantOrderByRelationAggregateInput
    defaultVariant?: ProductVariantOrderByWithRelationInput
  }

  export type ProductModelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    defaultVariantId?: string
    AND?: ProductModelWhereInput | ProductModelWhereInput[]
    OR?: ProductModelWhereInput[]
    NOT?: ProductModelWhereInput | ProductModelWhereInput[]
    modelName?: StringFilter<"ProductModel"> | string
    displayNamePT?: StringFilter<"ProductModel"> | string
    displayNameEN?: StringFilter<"ProductModel"> | string
    displayNameES?: StringFilter<"ProductModel"> | string
    category?: StringFilter<"ProductModel"> | string
    subcategory?: StringFilter<"ProductModel"> | string
    productType?: StringFilter<"ProductModel"> | string
    baseDescriptionPT?: StringFilter<"ProductModel"> | string
    baseDescriptionEN?: StringFilter<"ProductModel"> | string
    baseDescriptionES?: StringFilter<"ProductModel"> | string
    baseFeatures?: StringFilter<"ProductModel"> | string
    baseMaterials?: StringFilter<"ProductModel"> | string
    dimensionsWidth?: FloatFilter<"ProductModel"> | number
    dimensionsHeight?: FloatFilter<"ProductModel"> | number
    dimensionsDepth?: FloatFilter<"ProductModel"> | number
    dimensionsUnit?: StringFilter<"ProductModel"> | string
    weight?: FloatFilter<"ProductModel"> | number
    relatedProductModelIds?: StringFilter<"ProductModel"> | string
    createdAt?: DateTimeFilter<"ProductModel"> | Date | string
    updatedAt?: DateTimeFilter<"ProductModel"> | Date | string
    variants?: ProductVariantListRelationFilter
    defaultVariant?: XOR<ProductVariantNullableScalarRelationFilter, ProductVariantWhereInput> | null
  }, "id" | "defaultVariantId">

  export type ProductModelOrderByWithAggregationInput = {
    id?: SortOrder
    modelName?: SortOrder
    displayNamePT?: SortOrder
    displayNameEN?: SortOrder
    displayNameES?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    productType?: SortOrder
    baseDescriptionPT?: SortOrder
    baseDescriptionEN?: SortOrder
    baseDescriptionES?: SortOrder
    baseFeatures?: SortOrder
    baseMaterials?: SortOrder
    dimensionsWidth?: SortOrder
    dimensionsHeight?: SortOrder
    dimensionsDepth?: SortOrder
    dimensionsUnit?: SortOrder
    weight?: SortOrder
    defaultVariantId?: SortOrderInput | SortOrder
    relatedProductModelIds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductModelCountOrderByAggregateInput
    _avg?: ProductModelAvgOrderByAggregateInput
    _max?: ProductModelMaxOrderByAggregateInput
    _min?: ProductModelMinOrderByAggregateInput
    _sum?: ProductModelSumOrderByAggregateInput
  }

  export type ProductModelScalarWhereWithAggregatesInput = {
    AND?: ProductModelScalarWhereWithAggregatesInput | ProductModelScalarWhereWithAggregatesInput[]
    OR?: ProductModelScalarWhereWithAggregatesInput[]
    NOT?: ProductModelScalarWhereWithAggregatesInput | ProductModelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProductModel"> | string
    modelName?: StringWithAggregatesFilter<"ProductModel"> | string
    displayNamePT?: StringWithAggregatesFilter<"ProductModel"> | string
    displayNameEN?: StringWithAggregatesFilter<"ProductModel"> | string
    displayNameES?: StringWithAggregatesFilter<"ProductModel"> | string
    category?: StringWithAggregatesFilter<"ProductModel"> | string
    subcategory?: StringWithAggregatesFilter<"ProductModel"> | string
    productType?: StringWithAggregatesFilter<"ProductModel"> | string
    baseDescriptionPT?: StringWithAggregatesFilter<"ProductModel"> | string
    baseDescriptionEN?: StringWithAggregatesFilter<"ProductModel"> | string
    baseDescriptionES?: StringWithAggregatesFilter<"ProductModel"> | string
    baseFeatures?: StringWithAggregatesFilter<"ProductModel"> | string
    baseMaterials?: StringWithAggregatesFilter<"ProductModel"> | string
    dimensionsWidth?: FloatWithAggregatesFilter<"ProductModel"> | number
    dimensionsHeight?: FloatWithAggregatesFilter<"ProductModel"> | number
    dimensionsDepth?: FloatWithAggregatesFilter<"ProductModel"> | number
    dimensionsUnit?: StringWithAggregatesFilter<"ProductModel"> | string
    weight?: FloatWithAggregatesFilter<"ProductModel"> | number
    defaultVariantId?: StringNullableWithAggregatesFilter<"ProductModel"> | string | null
    relatedProductModelIds?: StringWithAggregatesFilter<"ProductModel"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ProductModel"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProductModel"> | Date | string
  }

  export type ProductVariantWhereInput = {
    AND?: ProductVariantWhereInput | ProductVariantWhereInput[]
    OR?: ProductVariantWhereInput[]
    NOT?: ProductVariantWhereInput | ProductVariantWhereInput[]
    id?: StringFilter<"ProductVariant"> | string
    modelId?: StringFilter<"ProductVariant"> | string
    colorKey?: StringFilter<"ProductVariant"> | string
    colorNamePT?: StringFilter<"ProductVariant"> | string
    colorNameEN?: StringFilter<"ProductVariant"> | string
    colorNameES?: StringFilter<"ProductVariant"> | string
    colorHex?: StringFilter<"ProductVariant"> | string
    mainImageURL?: StringNullableFilter<"ProductVariant"> | string | null
    angleImageURLs?: StringFilter<"ProductVariant"> | string
    createdAt?: DateTimeFilter<"ProductVariant"> | Date | string
    updatedAt?: DateTimeFilter<"ProductVariant"> | Date | string
    model?: XOR<ProductModelScalarRelationFilter, ProductModelWhereInput>
    defaultForModel?: XOR<ProductModelNullableScalarRelationFilter, ProductModelWhereInput> | null
  }

  export type ProductVariantOrderByWithRelationInput = {
    id?: SortOrder
    modelId?: SortOrder
    colorKey?: SortOrder
    colorNamePT?: SortOrder
    colorNameEN?: SortOrder
    colorNameES?: SortOrder
    colorHex?: SortOrder
    mainImageURL?: SortOrderInput | SortOrder
    angleImageURLs?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    model?: ProductModelOrderByWithRelationInput
    defaultForModel?: ProductModelOrderByWithRelationInput
  }

  export type ProductVariantWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProductVariantWhereInput | ProductVariantWhereInput[]
    OR?: ProductVariantWhereInput[]
    NOT?: ProductVariantWhereInput | ProductVariantWhereInput[]
    modelId?: StringFilter<"ProductVariant"> | string
    colorKey?: StringFilter<"ProductVariant"> | string
    colorNamePT?: StringFilter<"ProductVariant"> | string
    colorNameEN?: StringFilter<"ProductVariant"> | string
    colorNameES?: StringFilter<"ProductVariant"> | string
    colorHex?: StringFilter<"ProductVariant"> | string
    mainImageURL?: StringNullableFilter<"ProductVariant"> | string | null
    angleImageURLs?: StringFilter<"ProductVariant"> | string
    createdAt?: DateTimeFilter<"ProductVariant"> | Date | string
    updatedAt?: DateTimeFilter<"ProductVariant"> | Date | string
    model?: XOR<ProductModelScalarRelationFilter, ProductModelWhereInput>
    defaultForModel?: XOR<ProductModelNullableScalarRelationFilter, ProductModelWhereInput> | null
  }, "id">

  export type ProductVariantOrderByWithAggregationInput = {
    id?: SortOrder
    modelId?: SortOrder
    colorKey?: SortOrder
    colorNamePT?: SortOrder
    colorNameEN?: SortOrder
    colorNameES?: SortOrder
    colorHex?: SortOrder
    mainImageURL?: SortOrderInput | SortOrder
    angleImageURLs?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductVariantCountOrderByAggregateInput
    _max?: ProductVariantMaxOrderByAggregateInput
    _min?: ProductVariantMinOrderByAggregateInput
  }

  export type ProductVariantScalarWhereWithAggregatesInput = {
    AND?: ProductVariantScalarWhereWithAggregatesInput | ProductVariantScalarWhereWithAggregatesInput[]
    OR?: ProductVariantScalarWhereWithAggregatesInput[]
    NOT?: ProductVariantScalarWhereWithAggregatesInput | ProductVariantScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProductVariant"> | string
    modelId?: StringWithAggregatesFilter<"ProductVariant"> | string
    colorKey?: StringWithAggregatesFilter<"ProductVariant"> | string
    colorNamePT?: StringWithAggregatesFilter<"ProductVariant"> | string
    colorNameEN?: StringWithAggregatesFilter<"ProductVariant"> | string
    colorNameES?: StringWithAggregatesFilter<"ProductVariant"> | string
    colorHex?: StringWithAggregatesFilter<"ProductVariant"> | string
    mainImageURL?: StringNullableWithAggregatesFilter<"ProductVariant"> | string | null
    angleImageURLs?: StringWithAggregatesFilter<"ProductVariant"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ProductVariant"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ProductVariant"> | Date | string
  }

  export type ProjectWhereInput = {
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    id?: StringFilter<"Project"> | string
    titlePT?: StringNullableFilter<"Project"> | string | null
    titleEN?: StringNullableFilter<"Project"> | string | null
    titleES?: StringNullableFilter<"Project"> | string | null
    imageUrl?: StringFilter<"Project"> | string
    location?: StringNullableFilter<"Project"> | string | null
    descriptionPT?: StringNullableFilter<"Project"> | string | null
    descriptionEN?: StringNullableFilter<"Project"> | string | null
    descriptionES?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    titlePT?: SortOrderInput | SortOrder
    titleEN?: SortOrderInput | SortOrder
    titleES?: SortOrderInput | SortOrder
    imageUrl?: SortOrder
    location?: SortOrderInput | SortOrder
    descriptionPT?: SortOrderInput | SortOrder
    descriptionEN?: SortOrderInput | SortOrder
    descriptionES?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProjectWhereInput | ProjectWhereInput[]
    OR?: ProjectWhereInput[]
    NOT?: ProjectWhereInput | ProjectWhereInput[]
    titlePT?: StringNullableFilter<"Project"> | string | null
    titleEN?: StringNullableFilter<"Project"> | string | null
    titleES?: StringNullableFilter<"Project"> | string | null
    imageUrl?: StringFilter<"Project"> | string
    location?: StringNullableFilter<"Project"> | string | null
    descriptionPT?: StringNullableFilter<"Project"> | string | null
    descriptionEN?: StringNullableFilter<"Project"> | string | null
    descriptionES?: StringNullableFilter<"Project"> | string | null
    createdAt?: DateTimeFilter<"Project"> | Date | string
    updatedAt?: DateTimeFilter<"Project"> | Date | string
  }, "id">

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    titlePT?: SortOrderInput | SortOrder
    titleEN?: SortOrderInput | SortOrder
    titleES?: SortOrderInput | SortOrder
    imageUrl?: SortOrder
    location?: SortOrderInput | SortOrder
    descriptionPT?: SortOrderInput | SortOrder
    descriptionEN?: SortOrderInput | SortOrder
    descriptionES?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    OR?: ProjectScalarWhereWithAggregatesInput[]
    NOT?: ProjectScalarWhereWithAggregatesInput | ProjectScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Project"> | string
    titlePT?: StringNullableWithAggregatesFilter<"Project"> | string | null
    titleEN?: StringNullableWithAggregatesFilter<"Project"> | string | null
    titleES?: StringNullableWithAggregatesFilter<"Project"> | string | null
    imageUrl?: StringWithAggregatesFilter<"Project"> | string
    location?: StringNullableWithAggregatesFilter<"Project"> | string | null
    descriptionPT?: StringNullableWithAggregatesFilter<"Project"> | string | null
    descriptionEN?: StringNullableWithAggregatesFilter<"Project"> | string | null
    descriptionES?: StringNullableWithAggregatesFilter<"Project"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Project"> | Date | string
  }

  export type ProductModelCreateInput = {
    id?: string
    modelName: string
    displayNamePT: string
    displayNameEN: string
    displayNameES: string
    category: string
    subcategory: string
    productType: string
    baseDescriptionPT: string
    baseDescriptionEN: string
    baseDescriptionES: string
    baseFeatures?: string
    baseMaterials?: string
    dimensionsWidth: number
    dimensionsHeight: number
    dimensionsDepth: number
    dimensionsUnit: string
    weight: number
    relatedProductModelIds?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    variants?: ProductVariantCreateNestedManyWithoutModelInput
    defaultVariant?: ProductVariantCreateNestedOneWithoutDefaultForModelInput
  }

  export type ProductModelUncheckedCreateInput = {
    id?: string
    modelName: string
    displayNamePT: string
    displayNameEN: string
    displayNameES: string
    category: string
    subcategory: string
    productType: string
    baseDescriptionPT: string
    baseDescriptionEN: string
    baseDescriptionES: string
    baseFeatures?: string
    baseMaterials?: string
    dimensionsWidth: number
    dimensionsHeight: number
    dimensionsDepth: number
    dimensionsUnit: string
    weight: number
    defaultVariantId?: string | null
    relatedProductModelIds?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    variants?: ProductVariantUncheckedCreateNestedManyWithoutModelInput
  }

  export type ProductModelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    displayNamePT?: StringFieldUpdateOperationsInput | string
    displayNameEN?: StringFieldUpdateOperationsInput | string
    displayNameES?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    productType?: StringFieldUpdateOperationsInput | string
    baseDescriptionPT?: StringFieldUpdateOperationsInput | string
    baseDescriptionEN?: StringFieldUpdateOperationsInput | string
    baseDescriptionES?: StringFieldUpdateOperationsInput | string
    baseFeatures?: StringFieldUpdateOperationsInput | string
    baseMaterials?: StringFieldUpdateOperationsInput | string
    dimensionsWidth?: FloatFieldUpdateOperationsInput | number
    dimensionsHeight?: FloatFieldUpdateOperationsInput | number
    dimensionsDepth?: FloatFieldUpdateOperationsInput | number
    dimensionsUnit?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    relatedProductModelIds?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variants?: ProductVariantUpdateManyWithoutModelNestedInput
    defaultVariant?: ProductVariantUpdateOneWithoutDefaultForModelNestedInput
  }

  export type ProductModelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    displayNamePT?: StringFieldUpdateOperationsInput | string
    displayNameEN?: StringFieldUpdateOperationsInput | string
    displayNameES?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    productType?: StringFieldUpdateOperationsInput | string
    baseDescriptionPT?: StringFieldUpdateOperationsInput | string
    baseDescriptionEN?: StringFieldUpdateOperationsInput | string
    baseDescriptionES?: StringFieldUpdateOperationsInput | string
    baseFeatures?: StringFieldUpdateOperationsInput | string
    baseMaterials?: StringFieldUpdateOperationsInput | string
    dimensionsWidth?: FloatFieldUpdateOperationsInput | number
    dimensionsHeight?: FloatFieldUpdateOperationsInput | number
    dimensionsDepth?: FloatFieldUpdateOperationsInput | number
    dimensionsUnit?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    defaultVariantId?: NullableStringFieldUpdateOperationsInput | string | null
    relatedProductModelIds?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variants?: ProductVariantUncheckedUpdateManyWithoutModelNestedInput
  }

  export type ProductModelCreateManyInput = {
    id?: string
    modelName: string
    displayNamePT: string
    displayNameEN: string
    displayNameES: string
    category: string
    subcategory: string
    productType: string
    baseDescriptionPT: string
    baseDescriptionEN: string
    baseDescriptionES: string
    baseFeatures?: string
    baseMaterials?: string
    dimensionsWidth: number
    dimensionsHeight: number
    dimensionsDepth: number
    dimensionsUnit: string
    weight: number
    defaultVariantId?: string | null
    relatedProductModelIds?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductModelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    displayNamePT?: StringFieldUpdateOperationsInput | string
    displayNameEN?: StringFieldUpdateOperationsInput | string
    displayNameES?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    productType?: StringFieldUpdateOperationsInput | string
    baseDescriptionPT?: StringFieldUpdateOperationsInput | string
    baseDescriptionEN?: StringFieldUpdateOperationsInput | string
    baseDescriptionES?: StringFieldUpdateOperationsInput | string
    baseFeatures?: StringFieldUpdateOperationsInput | string
    baseMaterials?: StringFieldUpdateOperationsInput | string
    dimensionsWidth?: FloatFieldUpdateOperationsInput | number
    dimensionsHeight?: FloatFieldUpdateOperationsInput | number
    dimensionsDepth?: FloatFieldUpdateOperationsInput | number
    dimensionsUnit?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    relatedProductModelIds?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductModelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    displayNamePT?: StringFieldUpdateOperationsInput | string
    displayNameEN?: StringFieldUpdateOperationsInput | string
    displayNameES?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    productType?: StringFieldUpdateOperationsInput | string
    baseDescriptionPT?: StringFieldUpdateOperationsInput | string
    baseDescriptionEN?: StringFieldUpdateOperationsInput | string
    baseDescriptionES?: StringFieldUpdateOperationsInput | string
    baseFeatures?: StringFieldUpdateOperationsInput | string
    baseMaterials?: StringFieldUpdateOperationsInput | string
    dimensionsWidth?: FloatFieldUpdateOperationsInput | number
    dimensionsHeight?: FloatFieldUpdateOperationsInput | number
    dimensionsDepth?: FloatFieldUpdateOperationsInput | number
    dimensionsUnit?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    defaultVariantId?: NullableStringFieldUpdateOperationsInput | string | null
    relatedProductModelIds?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductVariantCreateInput = {
    id?: string
    colorKey: string
    colorNamePT: string
    colorNameEN: string
    colorNameES: string
    colorHex: string
    mainImageURL?: string | null
    angleImageURLs?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    model: ProductModelCreateNestedOneWithoutVariantsInput
    defaultForModel?: ProductModelCreateNestedOneWithoutDefaultVariantInput
  }

  export type ProductVariantUncheckedCreateInput = {
    id?: string
    modelId: string
    colorKey: string
    colorNamePT: string
    colorNameEN: string
    colorNameES: string
    colorHex: string
    mainImageURL?: string | null
    angleImageURLs?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    defaultForModel?: ProductModelUncheckedCreateNestedOneWithoutDefaultVariantInput
  }

  export type ProductVariantUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    colorKey?: StringFieldUpdateOperationsInput | string
    colorNamePT?: StringFieldUpdateOperationsInput | string
    colorNameEN?: StringFieldUpdateOperationsInput | string
    colorNameES?: StringFieldUpdateOperationsInput | string
    colorHex?: StringFieldUpdateOperationsInput | string
    mainImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    angleImageURLs?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    model?: ProductModelUpdateOneRequiredWithoutVariantsNestedInput
    defaultForModel?: ProductModelUpdateOneWithoutDefaultVariantNestedInput
  }

  export type ProductVariantUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    colorKey?: StringFieldUpdateOperationsInput | string
    colorNamePT?: StringFieldUpdateOperationsInput | string
    colorNameEN?: StringFieldUpdateOperationsInput | string
    colorNameES?: StringFieldUpdateOperationsInput | string
    colorHex?: StringFieldUpdateOperationsInput | string
    mainImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    angleImageURLs?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    defaultForModel?: ProductModelUncheckedUpdateOneWithoutDefaultVariantNestedInput
  }

  export type ProductVariantCreateManyInput = {
    id?: string
    modelId: string
    colorKey: string
    colorNamePT: string
    colorNameEN: string
    colorNameES: string
    colorHex: string
    mainImageURL?: string | null
    angleImageURLs?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductVariantUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    colorKey?: StringFieldUpdateOperationsInput | string
    colorNamePT?: StringFieldUpdateOperationsInput | string
    colorNameEN?: StringFieldUpdateOperationsInput | string
    colorNameES?: StringFieldUpdateOperationsInput | string
    colorHex?: StringFieldUpdateOperationsInput | string
    mainImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    angleImageURLs?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductVariantUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    colorKey?: StringFieldUpdateOperationsInput | string
    colorNamePT?: StringFieldUpdateOperationsInput | string
    colorNameEN?: StringFieldUpdateOperationsInput | string
    colorNameES?: StringFieldUpdateOperationsInput | string
    colorHex?: StringFieldUpdateOperationsInput | string
    mainImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    angleImageURLs?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateInput = {
    id?: string
    titlePT?: string | null
    titleEN?: string | null
    titleES?: string | null
    imageUrl: string
    location?: string | null
    descriptionPT?: string | null
    descriptionEN?: string | null
    descriptionES?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    titlePT?: string | null
    titleEN?: string | null
    titleES?: string | null
    imageUrl: string
    location?: string | null
    descriptionPT?: string | null
    descriptionEN?: string | null
    descriptionES?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titlePT?: NullableStringFieldUpdateOperationsInput | string | null
    titleEN?: NullableStringFieldUpdateOperationsInput | string | null
    titleES?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionPT?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionEN?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionES?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    titlePT?: NullableStringFieldUpdateOperationsInput | string | null
    titleEN?: NullableStringFieldUpdateOperationsInput | string | null
    titleES?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionPT?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionEN?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionES?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateManyInput = {
    id?: string
    titlePT?: string | null
    titleEN?: string | null
    titleES?: string | null
    imageUrl: string
    location?: string | null
    descriptionPT?: string | null
    descriptionEN?: string | null
    descriptionES?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    titlePT?: NullableStringFieldUpdateOperationsInput | string | null
    titleEN?: NullableStringFieldUpdateOperationsInput | string | null
    titleES?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionPT?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionEN?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionES?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    titlePT?: NullableStringFieldUpdateOperationsInput | string | null
    titleEN?: NullableStringFieldUpdateOperationsInput | string | null
    titleES?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: StringFieldUpdateOperationsInput | string
    location?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionPT?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionEN?: NullableStringFieldUpdateOperationsInput | string | null
    descriptionES?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ProductVariantListRelationFilter = {
    every?: ProductVariantWhereInput
    some?: ProductVariantWhereInput
    none?: ProductVariantWhereInput
  }

  export type ProductVariantNullableScalarRelationFilter = {
    is?: ProductVariantWhereInput | null
    isNot?: ProductVariantWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProductVariantOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductModelCountOrderByAggregateInput = {
    id?: SortOrder
    modelName?: SortOrder
    displayNamePT?: SortOrder
    displayNameEN?: SortOrder
    displayNameES?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    productType?: SortOrder
    baseDescriptionPT?: SortOrder
    baseDescriptionEN?: SortOrder
    baseDescriptionES?: SortOrder
    baseFeatures?: SortOrder
    baseMaterials?: SortOrder
    dimensionsWidth?: SortOrder
    dimensionsHeight?: SortOrder
    dimensionsDepth?: SortOrder
    dimensionsUnit?: SortOrder
    weight?: SortOrder
    defaultVariantId?: SortOrder
    relatedProductModelIds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductModelAvgOrderByAggregateInput = {
    dimensionsWidth?: SortOrder
    dimensionsHeight?: SortOrder
    dimensionsDepth?: SortOrder
    weight?: SortOrder
  }

  export type ProductModelMaxOrderByAggregateInput = {
    id?: SortOrder
    modelName?: SortOrder
    displayNamePT?: SortOrder
    displayNameEN?: SortOrder
    displayNameES?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    productType?: SortOrder
    baseDescriptionPT?: SortOrder
    baseDescriptionEN?: SortOrder
    baseDescriptionES?: SortOrder
    baseFeatures?: SortOrder
    baseMaterials?: SortOrder
    dimensionsWidth?: SortOrder
    dimensionsHeight?: SortOrder
    dimensionsDepth?: SortOrder
    dimensionsUnit?: SortOrder
    weight?: SortOrder
    defaultVariantId?: SortOrder
    relatedProductModelIds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductModelMinOrderByAggregateInput = {
    id?: SortOrder
    modelName?: SortOrder
    displayNamePT?: SortOrder
    displayNameEN?: SortOrder
    displayNameES?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    productType?: SortOrder
    baseDescriptionPT?: SortOrder
    baseDescriptionEN?: SortOrder
    baseDescriptionES?: SortOrder
    baseFeatures?: SortOrder
    baseMaterials?: SortOrder
    dimensionsWidth?: SortOrder
    dimensionsHeight?: SortOrder
    dimensionsDepth?: SortOrder
    dimensionsUnit?: SortOrder
    weight?: SortOrder
    defaultVariantId?: SortOrder
    relatedProductModelIds?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductModelSumOrderByAggregateInput = {
    dimensionsWidth?: SortOrder
    dimensionsHeight?: SortOrder
    dimensionsDepth?: SortOrder
    weight?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ProductModelScalarRelationFilter = {
    is?: ProductModelWhereInput
    isNot?: ProductModelWhereInput
  }

  export type ProductModelNullableScalarRelationFilter = {
    is?: ProductModelWhereInput | null
    isNot?: ProductModelWhereInput | null
  }

  export type ProductVariantCountOrderByAggregateInput = {
    id?: SortOrder
    modelId?: SortOrder
    colorKey?: SortOrder
    colorNamePT?: SortOrder
    colorNameEN?: SortOrder
    colorNameES?: SortOrder
    colorHex?: SortOrder
    mainImageURL?: SortOrder
    angleImageURLs?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductVariantMaxOrderByAggregateInput = {
    id?: SortOrder
    modelId?: SortOrder
    colorKey?: SortOrder
    colorNamePT?: SortOrder
    colorNameEN?: SortOrder
    colorNameES?: SortOrder
    colorHex?: SortOrder
    mainImageURL?: SortOrder
    angleImageURLs?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductVariantMinOrderByAggregateInput = {
    id?: SortOrder
    modelId?: SortOrder
    colorKey?: SortOrder
    colorNamePT?: SortOrder
    colorNameEN?: SortOrder
    colorNameES?: SortOrder
    colorHex?: SortOrder
    mainImageURL?: SortOrder
    angleImageURLs?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    titlePT?: SortOrder
    titleEN?: SortOrder
    titleES?: SortOrder
    imageUrl?: SortOrder
    location?: SortOrder
    descriptionPT?: SortOrder
    descriptionEN?: SortOrder
    descriptionES?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    titlePT?: SortOrder
    titleEN?: SortOrder
    titleES?: SortOrder
    imageUrl?: SortOrder
    location?: SortOrder
    descriptionPT?: SortOrder
    descriptionEN?: SortOrder
    descriptionES?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    titlePT?: SortOrder
    titleEN?: SortOrder
    titleES?: SortOrder
    imageUrl?: SortOrder
    location?: SortOrder
    descriptionPT?: SortOrder
    descriptionEN?: SortOrder
    descriptionES?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductVariantCreateNestedManyWithoutModelInput = {
    create?: XOR<ProductVariantCreateWithoutModelInput, ProductVariantUncheckedCreateWithoutModelInput> | ProductVariantCreateWithoutModelInput[] | ProductVariantUncheckedCreateWithoutModelInput[]
    connectOrCreate?: ProductVariantCreateOrConnectWithoutModelInput | ProductVariantCreateOrConnectWithoutModelInput[]
    createMany?: ProductVariantCreateManyModelInputEnvelope
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
  }

  export type ProductVariantCreateNestedOneWithoutDefaultForModelInput = {
    create?: XOR<ProductVariantCreateWithoutDefaultForModelInput, ProductVariantUncheckedCreateWithoutDefaultForModelInput>
    connectOrCreate?: ProductVariantCreateOrConnectWithoutDefaultForModelInput
    connect?: ProductVariantWhereUniqueInput
  }

  export type ProductVariantUncheckedCreateNestedManyWithoutModelInput = {
    create?: XOR<ProductVariantCreateWithoutModelInput, ProductVariantUncheckedCreateWithoutModelInput> | ProductVariantCreateWithoutModelInput[] | ProductVariantUncheckedCreateWithoutModelInput[]
    connectOrCreate?: ProductVariantCreateOrConnectWithoutModelInput | ProductVariantCreateOrConnectWithoutModelInput[]
    createMany?: ProductVariantCreateManyModelInputEnvelope
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ProductVariantUpdateManyWithoutModelNestedInput = {
    create?: XOR<ProductVariantCreateWithoutModelInput, ProductVariantUncheckedCreateWithoutModelInput> | ProductVariantCreateWithoutModelInput[] | ProductVariantUncheckedCreateWithoutModelInput[]
    connectOrCreate?: ProductVariantCreateOrConnectWithoutModelInput | ProductVariantCreateOrConnectWithoutModelInput[]
    upsert?: ProductVariantUpsertWithWhereUniqueWithoutModelInput | ProductVariantUpsertWithWhereUniqueWithoutModelInput[]
    createMany?: ProductVariantCreateManyModelInputEnvelope
    set?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    disconnect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    delete?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    update?: ProductVariantUpdateWithWhereUniqueWithoutModelInput | ProductVariantUpdateWithWhereUniqueWithoutModelInput[]
    updateMany?: ProductVariantUpdateManyWithWhereWithoutModelInput | ProductVariantUpdateManyWithWhereWithoutModelInput[]
    deleteMany?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[]
  }

  export type ProductVariantUpdateOneWithoutDefaultForModelNestedInput = {
    create?: XOR<ProductVariantCreateWithoutDefaultForModelInput, ProductVariantUncheckedCreateWithoutDefaultForModelInput>
    connectOrCreate?: ProductVariantCreateOrConnectWithoutDefaultForModelInput
    upsert?: ProductVariantUpsertWithoutDefaultForModelInput
    disconnect?: ProductVariantWhereInput | boolean
    delete?: ProductVariantWhereInput | boolean
    connect?: ProductVariantWhereUniqueInput
    update?: XOR<XOR<ProductVariantUpdateToOneWithWhereWithoutDefaultForModelInput, ProductVariantUpdateWithoutDefaultForModelInput>, ProductVariantUncheckedUpdateWithoutDefaultForModelInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ProductVariantUncheckedUpdateManyWithoutModelNestedInput = {
    create?: XOR<ProductVariantCreateWithoutModelInput, ProductVariantUncheckedCreateWithoutModelInput> | ProductVariantCreateWithoutModelInput[] | ProductVariantUncheckedCreateWithoutModelInput[]
    connectOrCreate?: ProductVariantCreateOrConnectWithoutModelInput | ProductVariantCreateOrConnectWithoutModelInput[]
    upsert?: ProductVariantUpsertWithWhereUniqueWithoutModelInput | ProductVariantUpsertWithWhereUniqueWithoutModelInput[]
    createMany?: ProductVariantCreateManyModelInputEnvelope
    set?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    disconnect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    delete?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    connect?: ProductVariantWhereUniqueInput | ProductVariantWhereUniqueInput[]
    update?: ProductVariantUpdateWithWhereUniqueWithoutModelInput | ProductVariantUpdateWithWhereUniqueWithoutModelInput[]
    updateMany?: ProductVariantUpdateManyWithWhereWithoutModelInput | ProductVariantUpdateManyWithWhereWithoutModelInput[]
    deleteMany?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[]
  }

  export type ProductModelCreateNestedOneWithoutVariantsInput = {
    create?: XOR<ProductModelCreateWithoutVariantsInput, ProductModelUncheckedCreateWithoutVariantsInput>
    connectOrCreate?: ProductModelCreateOrConnectWithoutVariantsInput
    connect?: ProductModelWhereUniqueInput
  }

  export type ProductModelCreateNestedOneWithoutDefaultVariantInput = {
    create?: XOR<ProductModelCreateWithoutDefaultVariantInput, ProductModelUncheckedCreateWithoutDefaultVariantInput>
    connectOrCreate?: ProductModelCreateOrConnectWithoutDefaultVariantInput
    connect?: ProductModelWhereUniqueInput
  }

  export type ProductModelUncheckedCreateNestedOneWithoutDefaultVariantInput = {
    create?: XOR<ProductModelCreateWithoutDefaultVariantInput, ProductModelUncheckedCreateWithoutDefaultVariantInput>
    connectOrCreate?: ProductModelCreateOrConnectWithoutDefaultVariantInput
    connect?: ProductModelWhereUniqueInput
  }

  export type ProductModelUpdateOneRequiredWithoutVariantsNestedInput = {
    create?: XOR<ProductModelCreateWithoutVariantsInput, ProductModelUncheckedCreateWithoutVariantsInput>
    connectOrCreate?: ProductModelCreateOrConnectWithoutVariantsInput
    upsert?: ProductModelUpsertWithoutVariantsInput
    connect?: ProductModelWhereUniqueInput
    update?: XOR<XOR<ProductModelUpdateToOneWithWhereWithoutVariantsInput, ProductModelUpdateWithoutVariantsInput>, ProductModelUncheckedUpdateWithoutVariantsInput>
  }

  export type ProductModelUpdateOneWithoutDefaultVariantNestedInput = {
    create?: XOR<ProductModelCreateWithoutDefaultVariantInput, ProductModelUncheckedCreateWithoutDefaultVariantInput>
    connectOrCreate?: ProductModelCreateOrConnectWithoutDefaultVariantInput
    upsert?: ProductModelUpsertWithoutDefaultVariantInput
    disconnect?: ProductModelWhereInput | boolean
    delete?: ProductModelWhereInput | boolean
    connect?: ProductModelWhereUniqueInput
    update?: XOR<XOR<ProductModelUpdateToOneWithWhereWithoutDefaultVariantInput, ProductModelUpdateWithoutDefaultVariantInput>, ProductModelUncheckedUpdateWithoutDefaultVariantInput>
  }

  export type ProductModelUncheckedUpdateOneWithoutDefaultVariantNestedInput = {
    create?: XOR<ProductModelCreateWithoutDefaultVariantInput, ProductModelUncheckedCreateWithoutDefaultVariantInput>
    connectOrCreate?: ProductModelCreateOrConnectWithoutDefaultVariantInput
    upsert?: ProductModelUpsertWithoutDefaultVariantInput
    disconnect?: ProductModelWhereInput | boolean
    delete?: ProductModelWhereInput | boolean
    connect?: ProductModelWhereUniqueInput
    update?: XOR<XOR<ProductModelUpdateToOneWithWhereWithoutDefaultVariantInput, ProductModelUpdateWithoutDefaultVariantInput>, ProductModelUncheckedUpdateWithoutDefaultVariantInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ProductVariantCreateWithoutModelInput = {
    id?: string
    colorKey: string
    colorNamePT: string
    colorNameEN: string
    colorNameES: string
    colorHex: string
    mainImageURL?: string | null
    angleImageURLs?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    defaultForModel?: ProductModelCreateNestedOneWithoutDefaultVariantInput
  }

  export type ProductVariantUncheckedCreateWithoutModelInput = {
    id?: string
    colorKey: string
    colorNamePT: string
    colorNameEN: string
    colorNameES: string
    colorHex: string
    mainImageURL?: string | null
    angleImageURLs?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    defaultForModel?: ProductModelUncheckedCreateNestedOneWithoutDefaultVariantInput
  }

  export type ProductVariantCreateOrConnectWithoutModelInput = {
    where: ProductVariantWhereUniqueInput
    create: XOR<ProductVariantCreateWithoutModelInput, ProductVariantUncheckedCreateWithoutModelInput>
  }

  export type ProductVariantCreateManyModelInputEnvelope = {
    data: ProductVariantCreateManyModelInput | ProductVariantCreateManyModelInput[]
  }

  export type ProductVariantCreateWithoutDefaultForModelInput = {
    id?: string
    colorKey: string
    colorNamePT: string
    colorNameEN: string
    colorNameES: string
    colorHex: string
    mainImageURL?: string | null
    angleImageURLs?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    model: ProductModelCreateNestedOneWithoutVariantsInput
  }

  export type ProductVariantUncheckedCreateWithoutDefaultForModelInput = {
    id?: string
    modelId: string
    colorKey: string
    colorNamePT: string
    colorNameEN: string
    colorNameES: string
    colorHex: string
    mainImageURL?: string | null
    angleImageURLs?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductVariantCreateOrConnectWithoutDefaultForModelInput = {
    where: ProductVariantWhereUniqueInput
    create: XOR<ProductVariantCreateWithoutDefaultForModelInput, ProductVariantUncheckedCreateWithoutDefaultForModelInput>
  }

  export type ProductVariantUpsertWithWhereUniqueWithoutModelInput = {
    where: ProductVariantWhereUniqueInput
    update: XOR<ProductVariantUpdateWithoutModelInput, ProductVariantUncheckedUpdateWithoutModelInput>
    create: XOR<ProductVariantCreateWithoutModelInput, ProductVariantUncheckedCreateWithoutModelInput>
  }

  export type ProductVariantUpdateWithWhereUniqueWithoutModelInput = {
    where: ProductVariantWhereUniqueInput
    data: XOR<ProductVariantUpdateWithoutModelInput, ProductVariantUncheckedUpdateWithoutModelInput>
  }

  export type ProductVariantUpdateManyWithWhereWithoutModelInput = {
    where: ProductVariantScalarWhereInput
    data: XOR<ProductVariantUpdateManyMutationInput, ProductVariantUncheckedUpdateManyWithoutModelInput>
  }

  export type ProductVariantScalarWhereInput = {
    AND?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[]
    OR?: ProductVariantScalarWhereInput[]
    NOT?: ProductVariantScalarWhereInput | ProductVariantScalarWhereInput[]
    id?: StringFilter<"ProductVariant"> | string
    modelId?: StringFilter<"ProductVariant"> | string
    colorKey?: StringFilter<"ProductVariant"> | string
    colorNamePT?: StringFilter<"ProductVariant"> | string
    colorNameEN?: StringFilter<"ProductVariant"> | string
    colorNameES?: StringFilter<"ProductVariant"> | string
    colorHex?: StringFilter<"ProductVariant"> | string
    mainImageURL?: StringNullableFilter<"ProductVariant"> | string | null
    angleImageURLs?: StringFilter<"ProductVariant"> | string
    createdAt?: DateTimeFilter<"ProductVariant"> | Date | string
    updatedAt?: DateTimeFilter<"ProductVariant"> | Date | string
  }

  export type ProductVariantUpsertWithoutDefaultForModelInput = {
    update: XOR<ProductVariantUpdateWithoutDefaultForModelInput, ProductVariantUncheckedUpdateWithoutDefaultForModelInput>
    create: XOR<ProductVariantCreateWithoutDefaultForModelInput, ProductVariantUncheckedCreateWithoutDefaultForModelInput>
    where?: ProductVariantWhereInput
  }

  export type ProductVariantUpdateToOneWithWhereWithoutDefaultForModelInput = {
    where?: ProductVariantWhereInput
    data: XOR<ProductVariantUpdateWithoutDefaultForModelInput, ProductVariantUncheckedUpdateWithoutDefaultForModelInput>
  }

  export type ProductVariantUpdateWithoutDefaultForModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    colorKey?: StringFieldUpdateOperationsInput | string
    colorNamePT?: StringFieldUpdateOperationsInput | string
    colorNameEN?: StringFieldUpdateOperationsInput | string
    colorNameES?: StringFieldUpdateOperationsInput | string
    colorHex?: StringFieldUpdateOperationsInput | string
    mainImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    angleImageURLs?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    model?: ProductModelUpdateOneRequiredWithoutVariantsNestedInput
  }

  export type ProductVariantUncheckedUpdateWithoutDefaultForModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelId?: StringFieldUpdateOperationsInput | string
    colorKey?: StringFieldUpdateOperationsInput | string
    colorNamePT?: StringFieldUpdateOperationsInput | string
    colorNameEN?: StringFieldUpdateOperationsInput | string
    colorNameES?: StringFieldUpdateOperationsInput | string
    colorHex?: StringFieldUpdateOperationsInput | string
    mainImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    angleImageURLs?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductModelCreateWithoutVariantsInput = {
    id?: string
    modelName: string
    displayNamePT: string
    displayNameEN: string
    displayNameES: string
    category: string
    subcategory: string
    productType: string
    baseDescriptionPT: string
    baseDescriptionEN: string
    baseDescriptionES: string
    baseFeatures?: string
    baseMaterials?: string
    dimensionsWidth: number
    dimensionsHeight: number
    dimensionsDepth: number
    dimensionsUnit: string
    weight: number
    relatedProductModelIds?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    defaultVariant?: ProductVariantCreateNestedOneWithoutDefaultForModelInput
  }

  export type ProductModelUncheckedCreateWithoutVariantsInput = {
    id?: string
    modelName: string
    displayNamePT: string
    displayNameEN: string
    displayNameES: string
    category: string
    subcategory: string
    productType: string
    baseDescriptionPT: string
    baseDescriptionEN: string
    baseDescriptionES: string
    baseFeatures?: string
    baseMaterials?: string
    dimensionsWidth: number
    dimensionsHeight: number
    dimensionsDepth: number
    dimensionsUnit: string
    weight: number
    defaultVariantId?: string | null
    relatedProductModelIds?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductModelCreateOrConnectWithoutVariantsInput = {
    where: ProductModelWhereUniqueInput
    create: XOR<ProductModelCreateWithoutVariantsInput, ProductModelUncheckedCreateWithoutVariantsInput>
  }

  export type ProductModelCreateWithoutDefaultVariantInput = {
    id?: string
    modelName: string
    displayNamePT: string
    displayNameEN: string
    displayNameES: string
    category: string
    subcategory: string
    productType: string
    baseDescriptionPT: string
    baseDescriptionEN: string
    baseDescriptionES: string
    baseFeatures?: string
    baseMaterials?: string
    dimensionsWidth: number
    dimensionsHeight: number
    dimensionsDepth: number
    dimensionsUnit: string
    weight: number
    relatedProductModelIds?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    variants?: ProductVariantCreateNestedManyWithoutModelInput
  }

  export type ProductModelUncheckedCreateWithoutDefaultVariantInput = {
    id?: string
    modelName: string
    displayNamePT: string
    displayNameEN: string
    displayNameES: string
    category: string
    subcategory: string
    productType: string
    baseDescriptionPT: string
    baseDescriptionEN: string
    baseDescriptionES: string
    baseFeatures?: string
    baseMaterials?: string
    dimensionsWidth: number
    dimensionsHeight: number
    dimensionsDepth: number
    dimensionsUnit: string
    weight: number
    relatedProductModelIds?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    variants?: ProductVariantUncheckedCreateNestedManyWithoutModelInput
  }

  export type ProductModelCreateOrConnectWithoutDefaultVariantInput = {
    where: ProductModelWhereUniqueInput
    create: XOR<ProductModelCreateWithoutDefaultVariantInput, ProductModelUncheckedCreateWithoutDefaultVariantInput>
  }

  export type ProductModelUpsertWithoutVariantsInput = {
    update: XOR<ProductModelUpdateWithoutVariantsInput, ProductModelUncheckedUpdateWithoutVariantsInput>
    create: XOR<ProductModelCreateWithoutVariantsInput, ProductModelUncheckedCreateWithoutVariantsInput>
    where?: ProductModelWhereInput
  }

  export type ProductModelUpdateToOneWithWhereWithoutVariantsInput = {
    where?: ProductModelWhereInput
    data: XOR<ProductModelUpdateWithoutVariantsInput, ProductModelUncheckedUpdateWithoutVariantsInput>
  }

  export type ProductModelUpdateWithoutVariantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    displayNamePT?: StringFieldUpdateOperationsInput | string
    displayNameEN?: StringFieldUpdateOperationsInput | string
    displayNameES?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    productType?: StringFieldUpdateOperationsInput | string
    baseDescriptionPT?: StringFieldUpdateOperationsInput | string
    baseDescriptionEN?: StringFieldUpdateOperationsInput | string
    baseDescriptionES?: StringFieldUpdateOperationsInput | string
    baseFeatures?: StringFieldUpdateOperationsInput | string
    baseMaterials?: StringFieldUpdateOperationsInput | string
    dimensionsWidth?: FloatFieldUpdateOperationsInput | number
    dimensionsHeight?: FloatFieldUpdateOperationsInput | number
    dimensionsDepth?: FloatFieldUpdateOperationsInput | number
    dimensionsUnit?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    relatedProductModelIds?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    defaultVariant?: ProductVariantUpdateOneWithoutDefaultForModelNestedInput
  }

  export type ProductModelUncheckedUpdateWithoutVariantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    displayNamePT?: StringFieldUpdateOperationsInput | string
    displayNameEN?: StringFieldUpdateOperationsInput | string
    displayNameES?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    productType?: StringFieldUpdateOperationsInput | string
    baseDescriptionPT?: StringFieldUpdateOperationsInput | string
    baseDescriptionEN?: StringFieldUpdateOperationsInput | string
    baseDescriptionES?: StringFieldUpdateOperationsInput | string
    baseFeatures?: StringFieldUpdateOperationsInput | string
    baseMaterials?: StringFieldUpdateOperationsInput | string
    dimensionsWidth?: FloatFieldUpdateOperationsInput | number
    dimensionsHeight?: FloatFieldUpdateOperationsInput | number
    dimensionsDepth?: FloatFieldUpdateOperationsInput | number
    dimensionsUnit?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    defaultVariantId?: NullableStringFieldUpdateOperationsInput | string | null
    relatedProductModelIds?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductModelUpsertWithoutDefaultVariantInput = {
    update: XOR<ProductModelUpdateWithoutDefaultVariantInput, ProductModelUncheckedUpdateWithoutDefaultVariantInput>
    create: XOR<ProductModelCreateWithoutDefaultVariantInput, ProductModelUncheckedCreateWithoutDefaultVariantInput>
    where?: ProductModelWhereInput
  }

  export type ProductModelUpdateToOneWithWhereWithoutDefaultVariantInput = {
    where?: ProductModelWhereInput
    data: XOR<ProductModelUpdateWithoutDefaultVariantInput, ProductModelUncheckedUpdateWithoutDefaultVariantInput>
  }

  export type ProductModelUpdateWithoutDefaultVariantInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    displayNamePT?: StringFieldUpdateOperationsInput | string
    displayNameEN?: StringFieldUpdateOperationsInput | string
    displayNameES?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    productType?: StringFieldUpdateOperationsInput | string
    baseDescriptionPT?: StringFieldUpdateOperationsInput | string
    baseDescriptionEN?: StringFieldUpdateOperationsInput | string
    baseDescriptionES?: StringFieldUpdateOperationsInput | string
    baseFeatures?: StringFieldUpdateOperationsInput | string
    baseMaterials?: StringFieldUpdateOperationsInput | string
    dimensionsWidth?: FloatFieldUpdateOperationsInput | number
    dimensionsHeight?: FloatFieldUpdateOperationsInput | number
    dimensionsDepth?: FloatFieldUpdateOperationsInput | number
    dimensionsUnit?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    relatedProductModelIds?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variants?: ProductVariantUpdateManyWithoutModelNestedInput
  }

  export type ProductModelUncheckedUpdateWithoutDefaultVariantInput = {
    id?: StringFieldUpdateOperationsInput | string
    modelName?: StringFieldUpdateOperationsInput | string
    displayNamePT?: StringFieldUpdateOperationsInput | string
    displayNameEN?: StringFieldUpdateOperationsInput | string
    displayNameES?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: StringFieldUpdateOperationsInput | string
    productType?: StringFieldUpdateOperationsInput | string
    baseDescriptionPT?: StringFieldUpdateOperationsInput | string
    baseDescriptionEN?: StringFieldUpdateOperationsInput | string
    baseDescriptionES?: StringFieldUpdateOperationsInput | string
    baseFeatures?: StringFieldUpdateOperationsInput | string
    baseMaterials?: StringFieldUpdateOperationsInput | string
    dimensionsWidth?: FloatFieldUpdateOperationsInput | number
    dimensionsHeight?: FloatFieldUpdateOperationsInput | number
    dimensionsDepth?: FloatFieldUpdateOperationsInput | number
    dimensionsUnit?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    relatedProductModelIds?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    variants?: ProductVariantUncheckedUpdateManyWithoutModelNestedInput
  }

  export type ProductVariantCreateManyModelInput = {
    id?: string
    colorKey: string
    colorNamePT: string
    colorNameEN: string
    colorNameES: string
    colorHex: string
    mainImageURL?: string | null
    angleImageURLs?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductVariantUpdateWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    colorKey?: StringFieldUpdateOperationsInput | string
    colorNamePT?: StringFieldUpdateOperationsInput | string
    colorNameEN?: StringFieldUpdateOperationsInput | string
    colorNameES?: StringFieldUpdateOperationsInput | string
    colorHex?: StringFieldUpdateOperationsInput | string
    mainImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    angleImageURLs?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    defaultForModel?: ProductModelUpdateOneWithoutDefaultVariantNestedInput
  }

  export type ProductVariantUncheckedUpdateWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    colorKey?: StringFieldUpdateOperationsInput | string
    colorNamePT?: StringFieldUpdateOperationsInput | string
    colorNameEN?: StringFieldUpdateOperationsInput | string
    colorNameES?: StringFieldUpdateOperationsInput | string
    colorHex?: StringFieldUpdateOperationsInput | string
    mainImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    angleImageURLs?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    defaultForModel?: ProductModelUncheckedUpdateOneWithoutDefaultVariantNestedInput
  }

  export type ProductVariantUncheckedUpdateManyWithoutModelInput = {
    id?: StringFieldUpdateOperationsInput | string
    colorKey?: StringFieldUpdateOperationsInput | string
    colorNamePT?: StringFieldUpdateOperationsInput | string
    colorNameEN?: StringFieldUpdateOperationsInput | string
    colorNameES?: StringFieldUpdateOperationsInput | string
    colorHex?: StringFieldUpdateOperationsInput | string
    mainImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    angleImageURLs?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}