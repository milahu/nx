import { PackageManager } from '../utils/package-manager';
import {
  InputDefinition,
  TargetDependencyConfig,
} from './workspace-config-project-config';

export type ImplicitDependencyEntry<T = '*' | string[]> = {
  [key: string]: T | ImplicitSubsetDependency<T>;
};

export interface ImplicitSubsetDependency<T = '*' | string[]> {
  [key: string]: T | ImplicitSubsetDependency<T>;
}

export interface NxAffectedConfig {
  /**
   * Default based branch used by affected commands.
   */
  defaultBase?: string;
}

export type TargetDefaults = Record<
  string,
  {
    outputs?: string[];
    dependsOn?: (TargetDependencyConfig | string)[];
    inputs?: (InputDefinition | string)[];
  }
>;

export type TargetDependencies = Record<
  string,
  (TargetDependencyConfig | string)[]
>;

/**
 * Nx configuration
 *
 * Supported filenames:
 *
 * - nx.json
 * - nx.yaml
 *
 * @note: when adding properties here add them to `allowedWorkspaceExtensions` in adapter/compat.ts
 */
export interface NxConfig<T = '*' | string[]> {
  /**
   * Optional (additional) Nx configuration file which becomes a base for this one
   */
  extends?: string;
  /**
   * Map of files to projects that implicitly depend on them
   */
  implicitDependencies?: ImplicitDependencyEntry<T>;
  /**
   * @deprecated use targetDefaults instead
   * Dependencies between different target names across all projects
   */
  targetDependencies?: TargetDependencies;
  /**
   * Named inputs targets can refer to reduce duplication
   */
  namedInputs?: { [inputName: string]: (string | InputDefinition)[] };
  /**
   * Dependencies between different target names across all projects
   */
  targetDefaults?: TargetDefaults;
  /**
   * NPM Scope that the workspace uses
   */
  npmScope?: string;
  /**
   * Default options for `nx affected`
   */
  affected?: NxAffectedConfig;
  /**
   * Where new apps + libs should be placed
   */
  workspaceLayout?: {
    libsDir: string;
    appsDir: string;
  };
  /**
   * Available Task Runners
   */
  tasksRunnerOptions?: {
    [tasksRunnerName: string]: {
      /**
       * Path to resolve the runner
       */
      runner: string;
      /**
       * Default options for the runner
       */
      options?: any;
    };
  };
  /**
   * List of default values used by generators.
   *
   * These defaults are global. They are used when no other defaults are configured.
   *
   * Example:
   *
   * ```
   * {
   *   "@nrwl/react": {
   *     "library": {
   *       "style": "scss"
   *     }
   *   }
   * }
   * ```
   */
  generators?: { [collectionName: string]: { [generatorName: string]: any } };

  /**
   * Default generator collection. It is used when no collection is provided.
   */
  cli?: {
    packageManager?: PackageManager;

    /**
     * @deprecated - defaultCollection is deprecated and will be removed
     */
    defaultCollection?: string;
    defaultProjectName?: string;
  };
  /**
   * Plugins for extending the project graph
   */
  plugins?: string[];

  /**
   * Configuration for Nx Plugins
   */
  pluginsConfig?: Record<string, unknown>;

  /**
   * Default project. When project isn't provided, the default project
   * will be used. Convenient for small workspaces with one main application.
   */
  defaultProject?: string;
}