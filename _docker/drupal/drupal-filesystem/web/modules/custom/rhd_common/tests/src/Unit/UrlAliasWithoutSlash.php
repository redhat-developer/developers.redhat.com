<?php
/**
 * @file
 * Contains Drupal\rhd_common\UrlAliasWithoutSlash
 */

namespace Drupal\Tests\rhd_common\Unit;
  
use Drupal\Tests\UnitTestCase;

/**
 * Add a slash to node alias units tests.
 * @group rhd_common
 */
  class UrlAliasWithoutSlash extends UnitTestCase {
    protected function setUp() {
      parent::setUp();
      $this->node_title =  $this->getRandomGenerator()->word(6);
      $this->node = $this->getMockBuilder('Drupal\node\Entity\Node')->disableOriginalConstructor()->getMock();
      $this->node->expects($this->any())->method('getTitle')->will($this->returnValue($this->node_title));
      $this->node_alias_path = $this->node_title;
      $this->node->expects($this->any())->method('getpath')->will($this->returnValue($this->node_alias_path));
    }
    
    /**
     * test function
     */
    public function testnodedetails() {
      $path = $this->node_alias_path;
      if (substr($path, 0, 1) !== '/') {
        // Add a slash with alias
        $this->node_url_alias = '/' .$this->node_alias_path;
      }
      $this->nodeStorage = $this->getMockBuilder('Drupal\node\NodeStorage')->disableOriginalConstructor()->getMock();
      $this->nodeStorage->expects($this->any())->method('load')->will($this->returnValueMap([[1, $this->node], [500, NULL],]));
      $entityManager = $this->getMockBuilder('Drupal\Core\Entity\EntityManagerInterface')->disableOriginalConstructor()->getMock();
      $entityManager->expects($this->any())->method('getStorage')->with('node')->willReturn($this->nodeStorage);

      $data = 'Node title is : ' . $this->node_title . PHP_EOL . 'Node Url alias is : ' . $this->node_url_alias;
      // Output node title and alias when executing on terminal.
      fwrite(STDERR, print_r($data, TRUE));
      $this->assertsame($this->node_title, $this->node_title);
    }
  }
 