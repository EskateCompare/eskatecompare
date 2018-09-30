<Feed>
             <Feed.Event compact>
                <Statistic size='mini'>
                  <Statistic.Value>
                  <Button.Group icon vertical>
                    <Button basic icon='angle up' onClick={this.handleImpression} customId={impression.impression.customId} value='yes'/>
                    <Button basic>{impression.votes.yes - impression.votes.no}</Button>
                    <Button basic icon='angle down' onClick={this.handleImpression} customId={impression.impression.customId} value='no'/>
                  </Button.Group>
                    </Statistic.Value>
                </Statistic>
                <Feed.Content style={{padding: '15px'}} content={impression.impression.content} />
              </Feed.Event>
            </Feed>