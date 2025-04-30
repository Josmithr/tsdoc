// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import type { TokenSequence } from '../parser/TokenSequence';
import { DocNodeKind, DocNode } from './DocNode';
import { DocBlock, type IDocBlockParameters, type IDocBlockParsedParameters } from './DocBlock';
import { DocExcerpt, ExcerptKind } from './DocExcerpt';

/**
 * Constructor parameters for {@link DocExampleBlock}.
 */
export interface IDocExampleBlockParameters extends IDocBlockParameters {}

/**
 * Constructor parameters for {@link DocExampleBlock}.
 */
export interface IDocExampleBlockParsedParameters extends IDocBlockParsedParameters {
  readonly title?: TokenSequence;
}

/**
 * Represents a parsed `@example` block.
 */
export class DocExampleBlock extends DocBlock {
  /**
   * Example title, if any.
   */
  public readonly title: DocExcerpt | undefined;

  /**
   * Don't call this directly.  Instead use {@link TSDocParser}
   * @internal
   */
  public constructor(parameters: IDocExampleBlockParameters | IDocExampleBlockParsedParameters) {
    super(parameters);

    console.log('New DocExampleBlock!');

    if (DocNode.isParsedParameters(parameters)) {
      console.log('PARSED');

      if (parameters.title !== undefined) {
        console.log('With title!');
        this.title = new DocExcerpt({
          configuration: this.configuration,
          excerptKind: ExcerptKind.ExampleTitle,
          content: parameters.title
        });
      } else {
        console.log('Without title!');
      }
    } else {
      console.log('UNPARSED');
    }
  }

  /** @override */
  public get kind(): DocNodeKind | string {
    return DocNodeKind.ExampleBlock;
  }

  /** @override */
  protected onGetChildNodes(): ReadonlyArray<DocNode | undefined> {
    return [this.blockTag, this.title, this.content];
  }
}
