// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import type { TokenSequence } from '../parser/TokenSequence';
import { DocNodeKind, DocNode } from './DocNode';
import { DocBlock, type IDocBlockParameters, type IDocBlockParsedParameters } from './DocBlock';
import { DocExcerpt, ExcerptKind } from './DocExcerpt';
import type { DocSection } from './DocSection';

/**
 * Constructor parameters for {@link DocExampleBlock}.
 */
export interface IDocExampleBlockParameters extends IDocBlockParameters {
  readonly title?: DocSection;
}

/**
 * Constructor parameters for {@link DocExampleBlock}.
 */
export interface IDocExampleBlockParsedParameters extends IDocBlockParsedParameters {
  readonly title?: string;
  readonly titleExcerpt?: TokenSequence;
}

/**
 * Represents a parsed `@example` block.
 */
export class DocExampleBlock extends DocBlock {
  // TODO: this should really be a parsed section, rather than plain text.
  public readonly title: string | undefined;
  public readonly titleExcerpt: DocExcerpt | undefined;

  /**
   * Don't call this directly.  Instead use {@link TSDocParser}
   * @internal
   */
  public constructor(parameters: IDocExampleBlockParameters | IDocExampleBlockParsedParameters) {
    super(parameters);

    if (DocNode.isParsedParameters(parameters)) {
      this.title = parameters.title;
      if (parameters.titleExcerpt !== undefined) {
        this.titleExcerpt = new DocExcerpt({
          configuration: this.configuration,
          excerptKind: ExcerptKind.ExampleTitle,
          content: parameters.titleExcerpt
        });
      }
    }
  }

  /** @override */
  public get kind(): DocNodeKind | string {
    return DocNodeKind.ExampleBlock;
  }

  /** @override */
  protected onGetChildNodes(): ReadonlyArray<DocNode | undefined> {
    return [this.blockTag, this.titleExcerpt, this.content];
  }
}
